import { service } from "."

export const uploadImage = async (image: File): Promise<{ path: string }> => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await service.post("/upload/image", formData)
    return res.data
}
export interface Product {
    name: string;
    cover: string;
    description: string
}
export const publishProduct = async (product: Product) => {
    const res = await service.post('/products/add', product)
    return res.data
}