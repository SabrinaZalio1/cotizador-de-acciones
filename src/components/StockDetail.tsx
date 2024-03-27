import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IStock, ILocationState } from '../service/stocks.service';

const StockDetails: React.FC = () => {
    const location = useLocation();
    const [stockDataState, setStockDataState] = useState<IStock | undefined>(undefined);
    const [selectedInterval, setSelectedInterval] = useState<string>('');
    const intervals = ['1m', '5m', '15m'];

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

    return (
        <div>
            <h2>Stock Details for {stockDataState?.name}</h2>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Tiempo Real
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Historico
                </label>
            </div>
            <div>
                <span>Intervalo</span>
                <div className="btn-group">
                    <button className="btn btn-secondary btn-lg dropdown-toggle c-stock-detail__interval" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedInterval || 'Setear'}
                    </button>
                    <div className="dropdown-menu">
                        {intervals.map((interval, index) => (
                            <button key={index} className="dropdown-item" type="button" onClick={() => handleIntervalChange(interval)}>{interval}</button>
                        ))}
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-secondary">Graficar</button>
        </div>
    );
};

export default StockDetails;
