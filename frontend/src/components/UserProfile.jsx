import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const UserProfile=()=>{
    const user=localStorage.getItem("user");
    const [userDetails,setUserDetails]=useState([]);
    useEffect(()=>{
        fetchUserDetails();
    },[]);
    const fetchUserDetails=async()=>{
        const response=await fetch(`https://fooddelivery-d0xd.onrender.com/user/${user}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.ok){
            const data=await response.json();
            console.log(data);
            setUserDetails(data.user ? data.user : []);
        }
        else{
            throw new Error("Failed to fetch user details");
        }
    }
    
    return(
        <div>
            <Navbar/>
            <div className="flex flex-col justify-center items-center p-6">
            <h1 className="text-4xl font-semibold font-vollkorn text-center mt-8 text-[#b8165c]">Profile Details</h1>
            {userDetails ? (

                <div  className="flex  justify-center items-center md:w-1/2 w-full gap-1 bg-white p-8 rounded-xl shadow-xl mt-8 ">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Username: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{localStorage.getItem("user")}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Name: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{userDetails.fullname}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Email: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{userDetails.email}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Phone: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{userDetails.phone}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-semibold font-vollkorn">Address: </h2>
                        <p className="text-xl font-semibold font-vollkorn text-gray-500">{userDetails.address}</p>
                    </div>
                </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    )
}

export default UserProfile;