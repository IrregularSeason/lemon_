import { Result, service } from "."
import { Product } from "./dashboard";

export const getProducts = async (): Result<Product[]> => {
    const res = await service.get('products/get');
    return res.data;
}

export const removeProduct = async (id: number) => {
    const res = await service.post('products/remove', {
        id
    })
    return res.data
}