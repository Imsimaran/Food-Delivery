import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import scan from "../assets/scan.jpg"
import credit from "../assets/credit.svg"
import bank from "../assets/bank.svg"
import upi from "../assets/upi.svg"
import cash from "../assets/cash.svg"
import ShimmerCheckout from "./ShimmerCheckout";
import { toast } from 'react-toastify';

const Checkout = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [showNetBanking, setShowNetBanking] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [showCod, setShowCod] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch("https://fooddelivery-d0xd.onrender.com/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setCart(data?.cart?.items || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Transform cart data into restaurant-wise grouped orders
        const restaurantOrders = Object.entries(
            cart.reduce((acc, item) => {
                const restaurantId = item.foodItem.restaurant;
                if (!acc[restaurantId]) {
                    acc[restaurantId] = {
                        restaurantId,
                        restaurantName: item.foodItem.restaurantName,
                        items: [],
                        subtotal: 0,
                        status: "pending",
                    };
                }
                acc[restaurantId].items.push({
                    foodItem: item.foodItem._id,
                    name: item.foodItem.name,
                    price: item.foodItem.price,
                    quantity: item.quantity,
                });
                acc[restaurantId].subtotal += item.foodItem.price * item.quantity;
                return acc;
            }, {})
        ).map(([_, order]) => order);
    
        // Calculate total amount
        const totalAmount = restaurantOrders.reduce((total, order) => total + order.subtotal, 0);
    
        // Construct the payload
        const payload = {
            restaurantOrders,
            totalAmount,
            deliveryAddress: {
                address,
                city,
                state,
                pincode,
            },
            paymentMethod: "cod", // Or dynamically set based on selected payment method
            paymentStatus: "pending",
        };

        if(payload.paymentMethod==="cod"){
            payload.paymentStatus="pending";
        }
        else{
            payload.paymentStatus="paid";
        }
    
        try {
            const response = await fetch("https://fooddelivery-d0xd.onrender.com/order", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
            if (response.ok) {
                toast.success("Order placed successfully!");
                navigate("/orders");
            } else {
                toast.error(data.message || "Failed to place order. Check all fields and try again.");
            }
        } catch (error) {
            // console.error("Error placing order:", error);
            toast.error("Failed to place order. Check all fields and try again.");
        }
    };
    

    if (loading) return <ShimmerCheckout/>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Address Form */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4 text-[#b8165c]">Delivery Address</h2>
                        <form className="flex flex-col gap-2">
                            {/* Form fields */} 
                            <label className="font-semibold text-lg">Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" 
                            />
                            <label className="font-semibold text-lg">City</label>  
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" 
                            />
                            <label className="font-semibold text-lg">State</label>
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" 
                            />
                            <label className="font-semibold text-lg">Pincode</label>
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" 
                            />
                            
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        {/* Group items by restaurant */}
                        {Object.entries(
                            cart.reduce((acc, item) => {
                                const restaurantId = item.foodItem.restaurant;
                                if (!acc[restaurantId]) {
                                    acc[restaurantId] = [];
                                }
                                acc[restaurantId].push(item);
                                return acc;
                            }, {})
                        ).map(([restaurantId, items]) => (
                            <div key={restaurantId} className="mb-6 border-b pb-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {items[0].foodItem.restaurantName}
                                </h3>
                                {items.map((item) => (
                                    <div key={item.foodItem._id} className="flex justify-between py-2">
                                        <span>{item.foodItem.name} x {item.quantity}</span>
                                        <span>₹{item.foodItem.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className="text-xl font-bold mt-4">
                            Total: ₹{cart.reduce((total, item) => total + (item.foodItem.price * item.quantity), 0)}
                        </div>
                        <hr className="my-4 border-gray-200 border-2" />
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Payment Method</h1>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-2 justify-center items-center">
                                    <img src={credit} alt="credit" className="w-6 h-6"/>
                                    <h1 onClick={() => setShowCard(!showCard)} className="cursor-pointer">Credit / Debit / ATM Card</h1>
                                </div>
                                    {showCard && <h1 className="cursor-pointer text-red-500 font-bold" onClick={() => setShowCard(false)}>X</h1>}
                                    </div>
                                    {showCard && 
                                    <div>
                                            <form className="flex flex-col gap-2 mt-1">
                                                <input type="text" placeholder="Card Number (16 digits)" className="border text-sm border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" />
                                                <div className="flex flex-row gap-2">
                                                    <input type="text" placeholder="Card Expiry" className="border text-sm border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" />
                                                <input type="text" placeholder="Card CVV" className="border w-1/2 text-sm border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#b8165c]" />
                                                </div>
                                                </form>
                                                <button type="submit" onClick={handleSubmit} className="bg-[#b8165c] mt-2 px-6  text-white border-2 border-[#b8165c] text-sm font-semibold  py-1 rounded-md hover:bg-white hover:text-[#b8165c] hover:border hover:border-[#b8165c]">Place Order</button>
                                            </div>
                                    
                                    }
                                
                                {/* <div className="flex flex-row justify-between">
                                    <h1 className="cursor-pointer">UPI</h1>
                                    {showUPI && <h1 className="cursor-pointer text-red-500 font-bold" onClick={() => setShowUPI(false)}>X</h1>}
                                </div> */}
                                <div className="flex flex-row justify-between">
                                <div className="flex justify-center items-center gap-2">
                                    <img src={bank} className="w-6 h-6"/>
                                    <h1 className="cursor-pointer" onClick={() => setShowNetBanking(!showNetBanking)}>Net Banking</h1>
                                </div>
                                    {showNetBanking && <h1 className="cursor-pointer text-red-500 font-bold" onClick={() => setShowNetBanking(false)}>X</h1>}
                                </div>
                                {showNetBanking && 
                                    <div>
                                    <form className="flex gap-2 mt-1 px-4">
                                        <input type="radio" name="bank" value="SBI "/><span className="cursor-pointer text-sm text-gray-500 font-semibold ">SBI</span>
                                        <input type="radio" name="bank" value="HDFC" /><span className="cursor-pointer text-sm text-gray-500 font-semibold">HDFC</span>
                                        <input type="radio" name="bank" value="ICICI" /><span className="cursor-pointer text-sm text-gray-500 font-semibold">ICICI</span>
                                        <input type="radio" name="bank" value="AXIS" /><span className="cursor-pointer text-sm text-gray-500 font-semibold">AXIS</span>
                                    </form> 
                                    <button onClick={handleSubmit} type="submit" className="bg-[#b8165c] mt-2 px-6  text-white border-2 border-[#b8165c] text-sm font-semibold  py-1 rounded-md hover:bg-white hover:text-[#b8165c] hover:border hover:border-[#b8165c]">Place Order</button>
                                    </div>
                                }
                                <div className="flex flex-row justify-between">
                                <div className="flex justify-center items-center gap-2">
                                    <img src={upi} className="w-6 h-6"/>
                                    <h1 className="cursor-pointer" onClick={()=>setShowScanner(!showScanner)}>UPI</h1>
                                </div>
                                    {showScanner && <h1 className="cursor-pointer text-red-500 font-bold" onClick={() => setShowScanner(false)}>X</h1>}
                                </div>
                                {showScanner && <div className="px-6">
                                <img src={scan} alt="scan" className="w-20 h-20"/>
                                <button onClick={handleSubmit} className="bg-[#b8165c] mt-2 px-6  text-white border-2 border-[#b8165c] text-sm font-semibold  py-1 rounded-md hover:bg-white hover:text-[#b8165c] hover:border hover:border-[#b8165c]">Scan & Pay</button>
                                    </div>
                                }
                                <div className="flex justify-between">
                                <div className="flex justify-center items-center gap-2">
                                    <img src={cash} className="w-6 h-6"/>
                                    <h1 className="cursor pointer" onClick={()=>setShowCod(!showCod)}>Cash on Delivery</h1>
                                </div>
                                {showCod && <h1 className="cursor-pointer text-red-500 font-bold" onClick={() => setShowCod(false)}>X</h1>}

                                </div>
                                {showCod && <div className="px-6">
                                    <button onClick={handleSubmit} className="bg-[#b8165c] mt-2 px-6  text-white border-2 border-[#b8165c] text-sm font-semibold  py-1 rounded-md hover:bg-white hover:text-[#b8165c] hover:border hover:border-[#b8165c]">Place Order</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;