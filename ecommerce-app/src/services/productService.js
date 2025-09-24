import products from "../data/products.json";

export const fetchProducts = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 3000);
    });
};