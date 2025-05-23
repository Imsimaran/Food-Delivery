import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import cartImg from "../assets/cart.png"
import veg from "../assets/veg.svg"
import nonVeg from "../assets/nonveg.svg"
import { useNavigate } from "react-router-dom";
import ShimmerCart from "./ShimmerCart";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token){
      navigate("/login");
    }else{
      fetchCart();
    }
  }, [token, navigate]); // Empty dependency array ensures this runs only once

  const fetchCart = async () => {
    try {
      if (!cart.length) {
        setIsLoading(true);
      }
      const response = await fetch("https://fooddelivery-d0xd.onrender.com/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        navigate("/login"); // Redirect to login page
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      console.log("data",data);
      setCart(data?.cart?.items || []);
      console.log("cart",cart);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
    }
  };

  const clearCart = async () => {
    const response = await fetch("https://fooddelivery-d0xd.onrender.com/cart/clear", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("cart cleared", data);
      fetchCart();
    } else {
      console.log("cart not cleared", data);
    }
  };

  const updateItemQuantity = async (foodItemId, increment) => {
    try {
      setIsUpdating(true);
      const response = await fetch("https://fooddelivery-d0xd.onrender.com/cart/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodItemId, increment }),
      });

      if (!response.ok) throw new Error("Failed to update cart");
      fetchCart(); // Re-fetch the cart to update the UI
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <ShimmerCart />;
  }

  return (
    <div>
      <Navbar />
      
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center gap-1 items-center min-h-screen">
            <img src={cartImg} alt="cart" className="w-40 h-40"/>
            <h1 className="text-4xl text-center font-semibold font-vollkorn">Your cart is empty.</h1>
            <p>You can go to home page to view more restaurants</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row w-full justify-around items-center p-6">
        <div className="flex flex-col justify-center items-center gap-4 flex-wrap py-10">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg w-full flex flex-col md:flex-row gap-4 items-center p-4 hover:shadow-lg cursor-pointer"
            >
              <div className="w-56 h-40">
                <img
                  src={item.foodItem.imageUrl}
                  alt={item.foodItem.name}
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                            <h1 className="text-2xl font-bold py-1">{item.foodItem.name}</h1>
                            <img src={item.foodItem.isVeg ? veg : nonVeg} alt={item.foodItem.isVeg ? "Veg" : "Non-Veg"} className="w-6 h-6"/>
                        </div>
                <p className="text-md font-semibold">
                  {item.foodItem.description}
                </p>
                <p className="text-md font-semibold text-[#b8165c]">
                  Rs.{item.foodItem.price}
                </p>
                <p className="text-md text-gray-500 font-semibold">
                  ⭐ {item.foodItem.ratings}
                </p>
                <div className="w-24 bg-white text-[#b8165c] text-xl flex justify-center items-center rounded-md px-4 py-2">
                  
                  <button
                    className="font-bold px-2 cursor-pointer bg-[#b8165c] text-white rounded-md"
                    onClick={() => updateItemQuantity(item.foodItem._id, false)}
                  >
                    -
                  </button>
                  <h1 className="font-semibold mx-2">{item.quantity}</h1>
                  <button
                    className="font-bold px-2 cursor-pointer bg-[#b8165c] text-white rounded-md"
                    onClick={() => updateItemQuantity(item.foodItem._id, true)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg w-full lg:w-1/4 p-2">
        <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold font-vollkorn text-center">Bill Details</h1>
        <button className="bg-[#b8165c] text-white px-2 py-1 md:px-4 md:py-2 rounded-md font-semibold hover:bg-white hover:text-[#b8165c] hover:border hover:border-[#b8165c]" onClick={clearCart}>Clear Cart</button>
        </div>
        
        {
            cart.map((item)=>(
                <ul key={item._id} className="px-4">
                <li>
                    <div className="flex justify-between items-center text-gray-600">
                    <div className="flex items-center gap-1">
                        <img src={item.foodItem.isVeg ? veg : nonVeg} alt={item.foodItem.isVeg ? "Veg" : "Non-Veg"} className="w-6 h-6"/>
                        <h1>{item.foodItem.name} ({item.quantity})</h1>
                    </div>
                        <h1>₹{item.foodItem.price * item.quantity}</h1>
                    </div>
                </li>
                </ul>
            ))
        }
        <hr className="w-full border-gray-300"/>
        <h1 className="text-xl font-semibold font-vollkorn">
        Bill Amount: ₹{" "}
        {cart.reduce(
          (total, item) => total + item.foodItem.price * item.quantity,
          0
        )}
      </h1>
      <button className="bg-[#b8165c] text-white px-2 py-1 md:px-4 md:py-2 rounded-md font-semibold hover:bg-white hover:text-[#b8165c] hover:border hover:border-[#b8165c]" onClick={()=>navigate("/checkout")}>Proceed to Checkout</button>
        </div>
        </div>
      )}
      
    </div>
  );
};

export default Cart;
