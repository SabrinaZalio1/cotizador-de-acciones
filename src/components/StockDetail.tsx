import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IStock, ILocationState, getTimeSeries } from '../service/stocks.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatStarAndEndDate } from '../utils/date.formatter';

const StockDetails: React.FC = () => {
    const location = useLocation();

    const [stockDataState, setStockDataState] = useState<IStock | undefined>(undefined);
    const [realTime, setRealTime] = useState(true);
    const [isDataAvailable, setIsDataAvailable] = useState(false)
    const [selectedInterval, setSelectedInterval] = useState<'1min'| '5min' | '15min' | string>('1min');
    const [stockXAndY, setStockXAndY] = useState<{ x: Date, y: number }[]>([])
    const [time, setTime] = useState<{ startTime: Date | null, endTime: Date | null }>({ startTime: null, endTime: null })

    const { name, exchange } = stockDataState ?? {};

    const intervals = ['1min', '5min', '15min'];

    useEffect(() => {
        const locationState = location.state as ILocationState | undefined;
        if (locationState) {
            const { stockData } = locationState;
            setStockDataState(stockData);
        }
    }, []);

    const handleIntervalChange = (interval: typeof selectedInterval) => {
        setSelectedInterval(interval);
    };

    const print = () => {
        const historic = ((time.startTime && time.endTime) && !realTime) ? formatStarAndEndDate(time) : undefined;

        getTimeSeries(stockDataState?.symbol!, selectedInterval, historic)
            .then(res => {
                const { values } = res;
                const data: typeof stockXAndY = [];

                if (!values) {
                    setIsDataAvailable(false);
                    return;
                }

                values.forEach(({ datetime, high }) => {
                    if (datetime && high) data.push({ x: new Date(datetime), y: Number(high) })
                })

                setIsDataAvailable(true)
                setStockXAndY(data)
            });
    };

    const options = {
        title: {
            text: exchange
        },
        series: [{
            name: 'High price',
            data: stockXAndY,
        }],
        yAxis: {
            title: {
                text: 'Cotizacion'
            },
            labels: {
                format: '{value}k'
            },

        },
        xAxis: {
            type: 'datetime',

        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 700
                }
            }]
        },
    }

    return (
        <div className='p-5'>
            <h2 className='mb-5'>Stock Details for: {name}</h2>

            <div className="form-check my-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" checked={realTime} onClick={() => setRealTime(!realTime)} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Tiempo Real
                </label>
            </div>
            <div className="form-check my-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" checked={!realTime} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Historico
                </label>
                <div>
                    <DatePicker
                        selectsStart
                        selected={time.startTime}
                        onChange={(date) => {
                            setRealTime(false)
                            return date && setTime({ ...time, startTime: date })
                        }
                        }
                        startDate={time.startTime}
                    />
                    <DatePicker
                        selectsEnd
                        selected={time.endTime}
                        onChange={(date) => {
                            setRealTime(false)
                            return date && setTime({ ...time, endTime: date })
                        }
                        }
                        endDate={time.endTime}
                        startDate={time.startTime}
                        minDate={time.startTime}
                    />
                </div>
            </div>
            <div>
                <span>Intervalo</span>

                <div className="btn-group ml-4">
                    <button className="btn btn-secondary dropdown-toggle c-stock-detail__interval" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedInterval || 'Setear'}
                    </button>
                    <div className="dropdown-menu">
                        {intervals.map((interval, index) => (
                            <button key={index} className="dropdown-item" type="button" onClick={() => handleIntervalChange(interval)}>{interval}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <button type="button" className="btn btn-secondary my-5" onClick={print}>Graficar</button>
            </div>

            {isDataAvailable ?
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
                : <span>No data available</span>}
        </div>
    );
};

export default StockDetails;
