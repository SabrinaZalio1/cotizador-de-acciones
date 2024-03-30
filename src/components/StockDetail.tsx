import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IStock, ILocationState, getTimeSeries } from '../service/stocks.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IStockValue {
    close: string;
    datetime: string;
    high: string;
    low: string;
    open: string;
    volume: string;
}
const StockDetails: React.FC = () => {

    const location = useLocation();
    const [stockDataState, setStockDataState] = useState<IStock | undefined>(undefined);
    const [selectedInterval, setSelectedInterval] = useState<string>('1min');
    const [stockValues, setStockValues] = useState<any>('')

    const [stockXAndY, setStockXAndY] = useState<{x: any, y: any}[]>([])

    const { name, exchange } = stockDataState ?? {};
    const [date, setDate] = useState<any>(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const intervals = ['1min', '5min', '15min'];

    // 
    const [realTime, setRealTime] = useState(true);
    // const [historylTime, setHistorylTime] = useState({ active: false, startDate: '', finishDate: '' });
    // 

    useEffect(() => {
        const locationState = location.state as ILocationState | undefined;
        if (locationState) {
            const { stockData } = locationState;
            console.log('Stock Data:', stockData);
            setStockDataState(stockData);
        }
    }, []);

    const handleIntervalChange = (interval: string) => {
        setSelectedInterval(interval);
    };

    const print = () => {
        getTimeSeries(stockDataState?.symbol!, selectedInterval)
            .then(res => {
                const { values } = res;
                console.log(values)
                const data = values.map((val) => {
                    return { x: new Date(val.datetime), y: Number(val.high) }
                })
                setStockXAndY(data)

                const highStockValues = res.values.map((stock: IStockValue) => Number(stock.high));
                setStockValues(highStockValues);

                
            });
    };

    console.log('stockValues', stockValues)

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
                format: '{value}°'
            },

        },
        xAxis: {
            type: 'datetime',
            
        },
        //     type: 'datetime',
        //     tickInterval: selectedInterval === '1min' ? 60 * 1000 : selectedInterval === '5min' ? 5 * 60 * 1000 : selectedInterval === '15min' ? 15 * 60 * 1000 : undefined,
        //     labels: {
        //         format: '{value:%H:%M}'
        //     },
        //     dateTimeLabelFormats: {
        //         minute: '%H:%M',
        //         hour: '%H:%M',
        //         day: '%e. %b',
        //         week: '%e. %b',
        //         month: '%b \'%y',
        //         year: '%Y'
        //     }
        // },
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
                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Historico
                </label>
                <div>
                    <DatePicker
                        selectsStart
                        selected={startDate}
                        onChange={(date:any) => setStartDate(date)}
                        startDate={startDate}
                    />
                    <DatePicker
                        selectsEnd
                        selected={endDate}
                        onChange={(date:any) =>setEndDate(date)}
                        endDate={endDate}
                        startDate={startDate}
                        minDate={startDate}
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
            <button type="button" className="btn btn-secondary my-5" onClick={print}>Graficar</button>


            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />

        </div>
    );
};

export default StockDetails;
