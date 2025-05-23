import { Link } from "react-router-dom";
import userImg from "../assets/user.svg";
import { useState } from "react";

const AdminNav = () => {
  const user = localStorage.getItem("user");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("restaurantId");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-lg bg-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold font-dancing">BeFoodie</h1>
      <div className="flex gap-4 font-semibold text-xl items-center">
        <Link to="/admin">Home</Link>
        <Link to="/profile">Profile</Link>
        {
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={userImg} alt="user" className="w-10 h-10 rounded-full" />
            <h1
              className="text-xl text-[#b8165c] font-bold"
            >
              {localStorage.getItem("user")}
            </h1>
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-48">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default AdminNav;
