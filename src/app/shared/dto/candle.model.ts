export interface Candle {
    time: string;
    currencyPair: string;
    open: number;
    close: number;
    high: number;
    low: number;
    vwap: number;
    volume: number;
    count: number;
}
