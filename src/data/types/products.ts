import { MANUFACTURERS } from "data/enums"

export interface IProduct {
    name: string,
    manufacturer: MANUFACTURERS,
    price: number,
    amount: number,
    note?: string
}

export interface ITableRowData {
    name: string,
    manufacturer: MANUFACTURERS,
    price: number
}