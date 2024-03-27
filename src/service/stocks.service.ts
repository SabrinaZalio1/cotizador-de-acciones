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

export interface IStockResponse {
    data: IStock[];
    status: 'ok' | string;
}

export interface ILocationState {
    stockData: IStock;
}

const baseUrl = 'https://api.twelvedata.com';

const paths = {
    stocks: '/stocks',
    timeSeries: '/time_series'
}


export const getAllStocks = async () => {
    const url = `${baseUrl}${paths.stocks}`
    try {
        const response = await axios.get<IStockResponse>(url)
        return response.data
    } catch (error) {
        // console.log(error)c
        throw new Error('Error getting the stock')
    }
}

export const getStockByParams = async () => {
    // const url = `${baseUrl}${paths.stocks}`
    // try {
    //     const response = await axios.get<IStockResponse>(url)
    //     return response.data
    // } catch (error) {
    //     console.log(error)
    //     throw new Error('Error getting the stock')
    // }
}