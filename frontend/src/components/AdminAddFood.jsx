import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { toast } from "react-toastify";
const AddFoodItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [ratings, setRatings] = useState("");
  const [isVeg, setIsVeg] = useState(null);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const restaurantId = localStorage.getItem("restaurantId");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare FormData for file and other fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("ratings", ratings);
    formData.append("vegOnly", isVeg);
    formData.append("restaurant", restaurantId);
    formData.append("availability", availability);
    formData.append("category", category);
    formData.append("avatar", imageUrl); // Add the file here
  
    try {
      const response = await fetch("https://fooddelivery-d0xd.onrender.com/food", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, // Use FormData as the body
      });
  
      if (!response.ok) {
        throw new Error("Failed to add food item");
      }
  
      toast.success("Food item added successfully.");
      navigate("/admin"); // Redirect to admin page
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };
  
  // Update file input handler
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageUrl(e.target.files[0])} // Set the File object
    className="w-full border rounded p-2 focus:outline-[#b8165c]"
  />;
  

  return (
    <div>
      <AdminNav />
      <div className="p-4 flex flex-col items-center justify-center w-full mt-4">
        <h2 className="text-4xl font-bold mb-2 text-[#b8165c] font-vollkorn">
          Add Food Item
        </h2>

        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="w-[40%] shadow-lg rounded-lg bg-white p-4 flex flex-col gap-2 mt-6"
        >
          <label className="text-lg font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 focus:outline-[#b8165c]"
            required
          />
          <label className="text-lg font-semibold">Restaurant:</label>
          <input
            type="text"
            name="restaurant"
            value={restaurantId}
            className="w-full border rounded p-2 focus:outline-[#b8165c]"
          />

          <label className="text-lg font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2 focus:outline-[#b8165c]"
            required
          />

          <label className="text-lg font-semibold">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded p-2 focus:outline-[#b8165c]"
            required
          />

          <label className="text-lg font-semibold">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2 focus:outline-[#b8165c]"
            required
          />

          <label className="text-lg font-semibold">Availability:</label>
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full border rounded p-2 focus:outline-[#b8165c]"
            required
          />

<label className="text-lg font-semibold">Ratings:</label>
<input
  type="number"
  value={ratings}
  onChange={(e) => setRatings(parseFloat(e.target.value) || "")} // Parse to float or reset if empty
  step="0.1" // Allow decimal steps
  min="0" // Optional: Ensure no negative ratings
  max="5" // Optional: Limit to a maximum value (e.g., 5 for ratings out of 5)
  className="w-full border rounded p-2 focus:outline-[#b8165c]"
  required
/>

<label className="text-lg font-semibold">Is Veg:</label>
<div className="flex gap-4">
  <div className="flex gap-2">
    <input
      type="radio"
      value="true"
      checked={isVeg === true} // Compare with boolean true
      onChange={() => setIsVeg(true)} // Set directly to true
      className="ml-2"
    />
    <label className="text-lg text-green-500 font-semibold">Veg</label>
  </div>
  <div className="flex gap-2">
    <input
      type="radio"
      value="false"
      checked={isVeg === false} // Compare with boolean false
      onChange={() => setIsVeg(false)} // Set directly to false
      className="ml-2"
    />
    <label className="text-lg text-red-500 font-semibold">Non-Veg</label>
  </div>
</div>



          <label className="text-lg font-semibold">Image</label>
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])} // Set the File object
              className="w-full border rounded p-2 focus:outline-[#b8165c]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#b8165c] text-xl text-white px-4 py-2 rounded mt-4 font-semibold border-2 border-[#b8165c] hover:text-[#b8165c] hover:border-2 hover:border-[#b8165c] hover:bg-white"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
