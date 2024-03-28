import axios from "axios";

export interface IStock {
    country: string;
    currency: string
    exchange: string;
    mic_code: string;
    name:string;
    symbol: string;
    type: string;
}

export interface ITimeSeries {
        meta: {
            symbol: string;
            interval: string;
            currency: string;
            exchange_timezone: string;
            exchange: string;
            mic_code: string;
            type: string;
        },
        values: 
            {
                datetime: string;
                open: string;
                high: string;
                low: string;
                close: string;
                volume: string;
            }[]
        status: string;
}

export interface IStockResponse {
    data: IStock[];
    status: 'ok' | string;
}

export interface ILocationState {
    stockData: IStock;
}

const baseUrl = 'https://api.twelvedata.com';
const api_key = '232f9a552ada4768a73c83bbc80ec388';

const paths = {
    stocks: '/stocks?country=arg',
    timeSeries: '/time_series'
}


export const getAllStocks = async () => {
    const url = `${baseUrl}${paths.stocks}`
    try {
        const response = await axios.get<IStockResponse>(url)
        return response.data
    } catch (error) {
        throw new Error('Error getting the stock')
    }
}

export const getStockByParams = async (param:'exchange' | 'symbol', value:string) => {
    // todo: then change & for ?
    const url = `${baseUrl}${paths.stocks}&${param}=${value}`
    try {
        const response = await axios.get<IStockResponse>(url)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Error getting the stock')
    }
}

export const getTimeSeries = async (symbol:string,interval:string) => {
    const url = `${baseUrl}${paths.timeSeries}?symbol=${symbol}&interval=${interval}&apikey=${api_key}`

    try {
        const response = await axios.get<ITimeSeries>(url)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Error getting the stock')
    }
}