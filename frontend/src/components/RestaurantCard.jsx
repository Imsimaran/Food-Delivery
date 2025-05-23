import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import veg from "../assets/veg.svg"
import nonVeg from "../assets/nonveg.svg"

const RestaurantCard = () => {
    const [foodItems,setFoodItems] = useState([]);
    const [restaurant,setRestaurant] = useState([]);
    const [cart,setCart] = useState([]);

    const {id} = useParams();
    localStorage.setItem("restaurantId",id);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
        fetchRestaurant();
    }, [id]);

    const fetchData= async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://fooddelivery-d0xd.onrender.com/food/restaurant/${id}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        // console.log(data);
        setFoodItems(data);
        // console.log(foodItems);
    }

    const fetchRestaurant= async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://fooddelivery-d0xd.onrender.com/restaurant/${id}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        // console.log(data);
        setRestaurant(data.restaurant);
    }

    const addToCart = async (foodItemId) => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate("/login");
        }
        const response = await fetch(`https://fooddelivery-d0xd.onrender.com/cart`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({foodItem:foodItemId,quantity:1})
        });
        const data = await response.json();
        // console.log(data);
        setCart((prev)=>({...prev,[foodItemId]:1}));
    }

    const incrementItem = async (foodItemId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch("https://fooddelivery-d0xd.onrender.com/cart/update", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ foodItemId, increment: true })
            });
            
            if (response.ok) {
                setCart((prev) => ({
                    ...prev,
                    [foodItemId]: (prev[foodItemId] || 0) + 1,
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const decrementItem = async (foodItemId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch("https://fooddelivery-d0xd.onrender.com/cart/update", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ foodItemId, increment: false })
            });
            
            if (response.ok) {
                setCart((prev) => {
                    const updatedCart = { ...prev };
                    if (updatedCart[foodItemId] > 1) {
                        updatedCart[foodItemId] -= 1;
                    } else {
                        delete updatedCart[foodItemId];
                    }
                    return updatedCart;
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar/>

            {restaurant ?  (
                <div className="flex flex-col justify-center items-center gap-1 flex-wrap p-6 mt-6">
                    <h1 className="md:text-4xl text-2xl font-bold text-[#b8165c]" >{restaurant.name}</h1>
                    <p className="text-md font-semibold text-gray-500">{restaurant.description}</p>
                    {/* <p className="text-md font-semibold text-gray-500">{restaurant.cuisine.join(', ')}</p> */}
                </div> ): <p>Loading restaurant...</p>
            }
            
            <div className="flex flex-col justify-center items-center gap-4 flex-wrap p-6 py-5">
            {foodItems.foodItems?.length > 0 ? (
                foodItems.foodItems.map((item) => (
                    <div key={item._id} className="bg-white flex flex-col md:flex-row shadow-md md:w-1/2 rounded-lg gap-4 items-center p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-[45%]">
                    <div className="">
                        <img src={item.imageUrl} alt={item.name} className="w-56 h-40 rounded-md object-cover"/>
                    </div>
                        <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <h1 className="text-xl font-bold py-1">{item.name}</h1>
                            <img src={item.isVeg ? veg : nonVeg} alt={item.isVeg ? "Veg" : "Non-Veg"} className="w-6 h-6"/>
                        </div>
                            <p className="text-md font-semibold">{item.description}</p>
                            <p className="text-md font-semibold text-[#b8165c]">₹{item.price}</p>
                            <p className="text-md text-gray-500 font-semibold">⭐ {item.ratings}</p>
                            {cart[item._id] ? (
                                <div className="flex items-center gap-2 border-2 border-[#b8165c] rounded-md w-24">
                                    <button onClick={()=>decrementItem(item._id)} className="w-10 text-[#b8165c] px-2 py-1 rounded-md font-semibold hover:border-[#b8165c] hover:text-[#b8165c] hover:bg-white">-</button>
                                    <span className="font-bold">{cart[item._id]}</span>
                                    <button onClick={()=>incrementItem(item._id)} className="w-10 text-[#b8165c] px-2 py-1 rounded-md font-semibold hover:border-[#b8165c] hover:text-[#b8165c] hover:bg-white">+</button>
                                </div>
                            ) : (
                                <button className="bg-[#b8165c] w-24 text-white border-2 border-[#b8165c] px-2 py-1 rounded-md font-semibold hover:border-[#b8165c] hover:text-[#b8165c] hover:bg-white" onClick={()=>addToCart(item._id)}>Add</button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-2xl font-bold text-gray-300">Loading food items...</p>
            )}
        </div>
        </div>
    )
}

export default RestaurantCard;