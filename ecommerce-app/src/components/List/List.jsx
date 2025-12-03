import ProductCard from '../ProductCard';
import './List.css';

const List = ({
    products = [],
    title = "Nuestros Productos",
    layout = "grid"
}) => {


    return (
        <div className='list-container'>

            {/* Header */}
            <div className='list-header'>
                <h1 className='list-title'>{title}</h1>
            </div>

            {layout === "grid" ? (
                <div className="list-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            orientation="vertical"
                            className="list-item"
                        />
                    ))}
                </div>
            ) : (
                <div className='list-vertical'>
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            orientation="horizontal"
                            className="list-item"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default List;