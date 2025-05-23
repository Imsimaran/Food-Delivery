import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { toast } from "react-toastify";

const EditFoodItem = () => {
  const { id } = useParams(); // Get the food item ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ratings: "",
    isVeg: false,
    imageUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodItem();
  }, []);

  const fetchFoodItem = async () => {
    try {
      const response = await fetch(`https://fooddelivery-d0xd.onrender.com/food/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("editdata",data);
      setFormData(data.foodItem); // Pre-fill the form with the fetched data
      // console.log("formdata",formData);
    } catch (error) {
      console.error("Error fetching food item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fooddelivery-d0xd.onrender.com/food/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update food item");
      }
      
      toast.success("Food item updated successfully");
      navigate(`/admin/restaurant/${id}`); // Redirect back to the admin page
    } catch (error) {
      toast.error("Error updating food item");
      console.error("Error updating food item:", error);
    }
  };

  return (
    <div>
    <AdminNav/>
    <div className="p-4 flex flex-col items-center justify-center w-full mt-10">
      <h2 className="text-4xl font-bold mb-4 text-[#b8165c] font-vollkorn">Edit Food Item</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md shadow-lg rounded-lg bg-white p-4 flex flex-col gap-2">
        <label className="text-lg font-semibold">
          Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        
        <label className="text-lg font-semibold">
          Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        
        <label className="text-lg font-semibold">
          Price: </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

        <label className="text-lg font-semibold">
          Category: </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        
        <label className="text-lg font-semibold">
          Ratings: </label>
          <input
            type="number"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
    
    <label className="text-lg font-semibold">Is Veg: </label>
<div className="flex gap-4">
  <div className="flex gap-2">
    <input
      type="radio"
      name="isVeg"
      value="true"
      checked={formData.isVeg === true}
      onChange={handleChange}
      className="ml-2"
    />
    <label className="text-lg text-green-500 font-semibold">Veg</label>
  </div>
  <div className="flex gap-2">
    <input
      type="radio"
      name="isVeg"
      value="false"
      checked={formData.isVeg === false}
      onChange={handleChange}
      className="ml-2"
    />
    <label className="text-lg text-red-500 font-semibold">Non-Veg</label>
  </div>
</div>


        <label className="text-lg font-semibold">
          Image URL: </label>
          <div className="flex gap-2">
          <textarea
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border rounded p-2"
            />
          <img src={formData.imageUrl} alt="food" className="w-16 h-16 rounded-md"/>
          </div>   
          
        
        <button
          type="submit"
          className="bg-[#b8165c] text-xl text-white px-4 py-2 rounded mt-4 font-semibold border-2 border-[#b8165c] hover:text-[#b8165c] hover:border-2 hover:border-[#b8165c] hover:bg-white"
        >
          Update
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditFoodItem;
