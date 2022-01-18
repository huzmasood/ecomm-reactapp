import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addToCart } from '../../redux/actions';
import Products from "./Products";

function Hero() {
    const dispatch = useDispatch();
    const input = useSelector((state) => state.input.userInput);
    const cart = useSelector((state) => state.cart.cart);
    const navigate = useNavigate();

    const filteredProducts = Products.filter((product) => product.name.toLowerCase().includes(input.toLowerCase()));

    const addItem = (product) => {
        const confirm = window.confirm("Are you sure?");
        if(!confirm) return;
        dispatch(addToCart(product));
        alert("Item added!")
    }

    const inCart = (product) => {
        if(cart.length === 0) return false;
        return cart.find(item => item.id === product.id)
    }

    return (
        <div className="flex flex-wrap justify-center pt-14">
            {filteredProducts.map((product) => {
                return (
                    <div key={product.id} className="shadow-inner w-64 sm:w-72 m-6 p-5 border-2 flex flex-col items-center bg-neutral-300 rounded-lg hover:shadow-xl">
                        <div className="w-60 h-64 flex justify-center">
                            <img alt="product" src={product.image}></img>
                        </div>
                        <div>Product ID: <b>{product.id}</b></div>
                        <div>Product Name: <b>{product.name}</b></div>
                        <div>Product Price: <b>{product.price}</b></div>
                        {inCart(product) ?
                        <button onClick={ () => navigate('ecomm-reactapp/cart') } className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1.5 px-3.5 rounded-full">View in Cart</button> :
                        <button onClick={ () => addItem(product) } className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1.5 px-3.5 rounded-full">Add to Cart</button>
                        }
                    </div>
                )
            })}
        </div>
    );
}

export default Hero;
