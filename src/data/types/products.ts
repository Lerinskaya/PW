import { MANUFACTURERS } from "data/enums"
import { IResponseFields } from "./core.types"

export interface IProduct {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
    amount: number;
    notes?: string;
}

export interface ITableRowData {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
}

export interface IProductDetails extends Required<IProduct> {
    createdOn: string;
}

export interface IProductFromResponse extends Required<IProductDetails> {
    _id: string;
}

export interface IProductResponse extends IResponseFields {
    Product: IProductFromResponse;
}
