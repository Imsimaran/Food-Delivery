import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

const Profile=()=>{
    const id=localStorage.getItem("userId");
    const [restaurantDetails, setRestaurantDetails]=useState([]);

    useEffect(()=>{
        fetchUserDetails();
    },[]);

    const fetchUserDetails=async()=>{
        try {
            const response=await fetch(`https://fooddelivery-d0xd.onrender.com/restaurant/owner/${id}`,{
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
            if (data?.restaurant && data.restaurant.length > 0) {
                localStorage.setItem("restaurantId",data.restaurant[0]._id);
                setRestaurantDetails(data.restaurant[0]);
            } else {
                setRestaurantDetails([]); // Handle case where no restaurant data is found
            }
        } catch(error) {
            console.error("Error fetching restaurant:", error);
        }
    }

    return(

        <div>
        <AdminNav/>
        <div className="min-h-screen w-full m-auto flex flex-col items-center">
            <h1 className="text-4xl font-semibold font-vollkorn text-center mt-8 text-[#b8165c]">Profile Details</h1>
            {restaurantDetails ? (

                <div  className="flex  justify-around w-1/2 gap-1 bg-white p-8 rounded-lg shadow-xl mt-8 ">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Username: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{localStorage.getItem("user")}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Name: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.name}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Email: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.email}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Phone: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.phone}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Address: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.address}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Description: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.description}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Cuisine: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">                                    
                        {Array.isArray(restaurantDetails.cuisine) ? restaurantDetails.cuisine.join(", ") : "No cuisine available"}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Rating: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.averageRating}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Vegetarian: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{restaurantDetails.isVegetarian ? "Yes" : "No"}</p>
                    </div>
                </div>
                <div>
                <img src={restaurantDetails.image} alt="Restaurant" className="w-full h-full object-cover rounded-md" />
                </div>
                </div>
                
            ) : (
                <p>Loading user details...</p>
            )}
            
        </div>
        </div>
        // </div>
    )
}

export default Profile;