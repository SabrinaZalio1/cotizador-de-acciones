import axios from "axios";
import { formatDate } from "../utils/date.formatter";

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
    // could not find a way to bring all the stocks without the site crashing, so i filtered by a country
    stocks: '/stocks?country=usa',
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

export const getStockByParams = async (param: 'exchange' | 'symbol', value: string) => {
    const url = `${baseUrl}${paths.stocks}&${param}=${value}`;
    try {
      const response = await axios.get<IStockResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error('Error getting the stock');
    }
  };

export const getTimeSeries = async (symbol:string, interval:string, historic?: { startDate:string, endDate:string }) => {
    const url = `${baseUrl}${paths.timeSeries}`
    // delimeted to 1000 because high chart does not support more
    const params = `?symbol=${symbol}&interval=${interval}&apikey=${api_key}&outputsize=1000`
    const optionalParams = historic ? `&start_date=${historic.startDate}&end_date=${historic.endDate}` : `&date=${formatDate(new Date())}`

    const finalUrl = `${url}${params}${optionalParams ? optionalParams : ''}`
    console.log(finalUrl)
    try {
        const response = await axios.get<ITimeSeries>(finalUrl)
        return response.data
    } catch (error) {
        throw new Error('Error getting the stock')
    }
}