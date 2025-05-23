import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Shimmer from "./Shimmer";

const Home = () => {
  const [restro, setRestro] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://fooddelivery-d0xd.onrender.com/restaurant/", {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData.restaurant);
    setRestro(responseData.restaurant ? responseData.restaurant : []);
    setSearchResults(responseData.restaurant ? responseData.restaurant : []);
  };

  console.log(restro);

  const handleSearch = () => {
    const filter = restro.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    setSearchResults(filter);
  };

  if(restro.length === 0){
    return <Shimmer/>;
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6 relative w-full h-full">
        <img src={logo} alt="logo" className="w-full md:h-[200px] h-[130px] object-cover opacity-90 rounded-xl" />
        <div className="absolute top-1/2 left-1/2 font-bold text-dancing-script text-white gap-2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-4xl md:p-4 w-full text-center bg-gray-200 text-dancing-script opacity-70 text-[#b8165c] rounded-xl">BeFoodie: Satisfy Your Cravings, Delivered Fast!</h1>
        </div>
      </div>
      <div className="md:w-1/2 w-full mx-auto flex justify-center items-center p-6 gap-2">
        <input type="text" placeholder="Search for restaurants" className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-[#b8165c]" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
       if (e.key === "Enter") {
           handleSearch();
       }
   }} />
        <button className="bg-[#b8165c] text-white font-bold text-sm md:text-xl border-2 border-[#b8165c] hover:bg-white hover:border-[#b8165c] hover:text-[#b8165c] p-2 rounded-md" 
        onClick={handleSearch} onKeyDown={(e)=>e.key==="Enter" && handleSearch()}>Search</button>
      </div>


      <div className="flex m-6 flex-col md:flex-wrap md:justify-center md:flex-row items-center justify-center gap-6">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div
              key={item._id}
              className="flex flex-col rounded-xl w-full md:w-1/2 lg:w-1/6 cursor-pointer hover:scale-90 transition-transform duration-300 ease-in-out shadow-lg"
              onClick={() => navigate(`/restaurant/${item._id}`)}
            >
              <img
                src={item.image}
                alt="restaurant"
                className="w-full h-40 object-cover rounded-t-xl "
              />
              <div className="px-4 py-2">
                <h1 className="text-xl font-bold py-2">{item.name}</h1>
                <div className="flex flex-row justify-between text-semibold">
                  <p>⭐{item.averageRating}</p>
                  <p>{item.deliveryTime}</p>
                </div>
                <p className="text-semibold text-gray-500">
                  {item.cuisine.join(", ")}
                </p>
                <hr className="border-gray-200 border-2 my-2"></hr>
                <p className="text-semibold text-gray-500 text-sm">{item.address}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No restaurants found</div>
        )}
      </div>
    </div>
  );
};
export default Home;
