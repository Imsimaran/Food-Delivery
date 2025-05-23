import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "./AdminNav";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonveg.svg";
import { toast } from "react-toastify";
const AdminRestaurant=()=>{
    const [restaurant,setRestaurant]=useState([]);
    const id=localStorage.getItem("restaurantId");
    useEffect(()=>{
        fetchRestaurant();
    },[])

    const deleteFoodItem=async(id)=>{
        const response=await fetch(`https://fooddelivery-d0xd.onrender.com/food/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.ok){
            toast.success("Food item deleted successfully");
            fetchRestaurant();
        }
        else{
            toast.error("Error deleting food item");
        }
    }

    const navigate=useNavigate();

    const fetchRestaurant=async()=>{
        try {
            const response=await fetch(`https://fooddelivery-d0xd.onrender.com/food/restaurant/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
                }
            });
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data=await response.json();
            console.log(data);
            setRestaurant(data);
            console.log(data);
        } catch(error) {
            console.error("Error fetching restaurant:", error);
        }
    }
    return(
        <div>
        <AdminNav/>
            {restaurant?.foodItems?.length > 0 ? (
    <div className="overflow-x-auto w-full mt-8 p-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-[#f3f3f3] text-center text-lg">
                    <th className="border border-gray-300 px-4 py-2">Food Item</th>
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Ratings</th>
                    <th className="border border-gray-300 px-4 py-2">Veg/Non-Veg</th>
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody className="font-semibold text-gray-700">
                {restaurant.foodItems.map((item) => (
                    <tr key={item._id} className="hover:bg-[#f9f9f9]">
                        <td className="border border-gray-300 px-4 py-2">
                            <div className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md"/>
                                <span className="ml-2">{item.name}</span>
                            </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                        <td className="border border-gray-300 px-4 py-2">₹{item.price}</td>
                        <td className="border border-gray-300 px-4 py-2">⭐ {item.ratings}</td>
                        <td className="border border-gray-300 px-4 py-2 ">
                        {item.isVeg ? <img src={veg} alt="veg" className="w-6 h-6"/> : <img src={nonVeg} alt="non-veg" className="w-6 h-6"/>}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                        {item.category.join(", ")}
                        </td>
                        <td className="px-4 py-2 flex gap-2 justify-center items-center">
                            <button className="bg-[#b8165c] text-white border-2 border-[#b8165c] px-4 py-2 rounded-md font-semibold hover:border-[#b8165c] hover:text-[#b8165c] hover:bg-white" onClick={() => navigate(`/admin/edit/${item._id}`)}>Edit</button>
                            <button className="bg-white text-red-500 px-4 py-2 border-2 border-red-500 rounded-md font-semibold hover:bg-red-500 hover:text-white" onClick={() => deleteFoodItem(item._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <p>Loading food items...</p>
)}



        </div>
    )
}

export default AdminRestaurant;