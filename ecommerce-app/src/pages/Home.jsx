import { useEffect, useState } from "react";
import BannerCarousel from '../components/BannerCarousel/BannerCarousel';
import homeImages from '../data/homeImages';
import { fetchProducts } from "../services/productService";
import Loading from "../components/common/Loading/Loading";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import List from "../components/List/List";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const productData = await fetchProducts();
                setProducts(productData);
            } catch (error) {
                setError("No se pudieron cargar los productos. Intenta más tarde")
                setLoading([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();

    }, []);

    return (
        <div>
            <BannerCarousel banners={homeImages} />
            {loading ? (
                <Loading>Cargando productos...</Loading>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : products.length > 0 ? (
                <List
                    title="Productos recomendados"
                    products={products}
                    layout="grid"
                />
            ) : (
                <ErrorMessage>No hay productos en el catálogo</ErrorMessage>
            )}
        </div>
    );
};