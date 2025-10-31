import  ProductCard  from '../ProductCard';
import './List.css';

const List = ({
    products = [],
    title = "Nuestros Productos",
    layout = "grid"
}) => {

    let classList = "";
    let orientationProduct = "";

    if (layout === "grid") {
        classList = "list-grid";
        orientationProduct = "vertical";
    } else {
        classList = "list-vertical";
        orientationProduct = "horizontal";
    }

    return (
        <div className='list-container'>

            {/* Header */}
            <div className='list-header'>
                <h1 className='list-title'>{title}</h1>
            </div>

            <div className={classList}>
                {products.map((product) => {
                    return <ProductCard
                        key={product._id}
                        product={product}
                        orientation={orientationProduct}
                    />
                })}
            </div>
        </div>
    );
};

export default List;