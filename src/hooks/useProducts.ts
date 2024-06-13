import { getProducts } from '@/service/example';
import { useProductsStore } from '@/store';
import { useEffect } from 'react'

export default function useProducts() {
    const productsStore = useProductsStore()
    useEffect(() => {
        if (productsStore.getProducts() === null)
            getProducts()
                .then((res) => {
                    productsStore.setProducts(res.data);
                });
    }, [productsStore]);

    return productsStore.getProducts() ?? []
}
