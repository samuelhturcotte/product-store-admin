import { useState, useEffect } from "react";
import ProductCard from "../product-cards/product-card";
import { useListProductsMutation } from "../services/api";
import "./product-store.css";

export const StoreComponent: React.FC = () => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [products] = useListProductsMutation();
    const [refetch, setRefetch] = useState(false);

    const updateProducts = () => {
        setRefetch(true);
    }
    useEffect(() => {
        products(null)
            .unwrap()
            .then(
                ({data}) => {
                    setIsLoaded(true);
                    setRefetch(false);
                    setItems(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setRefetch(false);
                    setError(error);
                }
            )
    }, [refetch])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    } else {
        return (
            <div className="store-container">
                <ul>
                    {items.map((item: any) => (
                        <li key={item.id}>
                            <ProductCard item={item} updateProducts={updateProducts}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default StoreComponent;