import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, increment, decrement, setOpen } from '../../redux/actions';
import Navbar from "../Navbar/Navbar";
import Checkout from '../Checkout/Checkout';

export let totalBill = 0;

function Cart() {
    const cartItems = useSelector((state) => state.cart.cart);
    const input = useSelector((state) => state.input.userInput);
    const dispatch = useDispatch();
    let bill = 0;

    const filteredProducts = cartItems.filter((product) => product.name.toLowerCase().includes(input.toLowerCase()));

    const incrementItem = (id, quantity, stock) => {
        if (quantity === stock) {
            alert('Sorry! But we are out of stock for this item.')
        } else {
            dispatch(increment(id))
        }
    }

    const decrementItem = (id, quantity) => {
        if (quantity === 1) {
            dispatch(removeFromCart(id))
        } else {
            dispatch(decrement(id))
        }
    }

    const clearItems = () => {
        const confirm = window.confirm("Are you sure?");
        if(!confirm) return;
        dispatch(clearCart())
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col m-1 items-center border-8 border-blue-900 border-dotted">
                <h1 className="text-2xl sm:text-5xl font-medium leading-tight mt-0 mb-2 text-neutral-600 px-2">
                    🛒 Your Cart 🛒
                </h1>
                {filteredProducts.map((item) => {
                    bill += item.price * item.quantity;
                    totalBill = bill;
                    return (
                        <div key={item.id} className="shadow-inner w-64 sm:w-72 m-6 p-5 border-2 flex flex-col items-center bg-neutral-300 rounded-lg hover:shadow-xl">
                            <div onClick={ () => dispatch(removeFromCart(item.id)) } className="ml-auto cursor-pointer">❌</div>
                            <div className="w-60 h-64 flex justify-center">
                                <img alt="product" src={item.image}></img>
                            </div>
                            <div>Product ID: <b>{item.id}</b></div>
                            <div>Product Name: <b>{item.name}</b></div>
                            <div>
                                Product Quantity:{` `}
                                <b>
                                    <span onClick={ () => { decrementItem(item.id, item.quantity) } } className="cursor-pointer">-</span>
                                    {` ${item.quantity} `}
                                    <span onClick={ () => { incrementItem(item.id, item.quantity, item.stock) } } className="cursor-pointer">+</span>
                                </b>
                            </div>
                        </div>
                    )
                })}
                {cartItems.length ?
                (<div className="text-center">
                    <button onClick={ clearItems } className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Clear Cart</button>
                    <h2 className="text-3xl sm:text-4xl font-medium leading-tight mt-0 mb-2 text-black py-5">Total Bill: <b>{bill}</b></h2>
                    <h3 onClick={ () => dispatch(setOpen(true)) } className="text-2xl sm:text-3xl font-medium leading-tight mt-0 mb-3 text-blue-600 hover:text-blue-400 cursor-pointer">Proceed to Checkout</h3>
                </div>) :
                <h2 className="text-4xl font-medium leading-tight mt-0 mb-2 text-black">empty 🙂</h2>
                }
            </div>
            <Checkout />
        </div>
    );
}

export default Cart;
