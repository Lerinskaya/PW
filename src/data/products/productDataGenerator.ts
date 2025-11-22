import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/products";
import { getRandomEnumValue } from "utils/utils";
import { MANUFACTURERS } from "data/enums";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    note: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}