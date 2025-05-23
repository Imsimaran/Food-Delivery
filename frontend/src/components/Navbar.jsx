import { Link } from "react-router-dom";
import userImg from "../assets/user.svg";
import { useState } from "react";
const Navbar=()=>{
    const user=localStorage.getItem("user");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("restaurantId");
        window.location.href="/";
    }
    
    return(
        <div className="sticky top-0 z-50 p-4 shadow-lg bg-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold font-dancing">BeFoodie</h1>
                
                <button 
                    className="md:hidden flex flex-col gap-1.5"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    <span className={`block w-6 h-0.5 bg-[#b8165c] transition-transform duration-300  ${showMobileMenu ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#b8165c]  ${showMobileMenu ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#b8165c] transition-transform duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                <div className="hidden md:flex gap-4 font-semibold text-xl items-center">
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                    {
                        user ?(
                            <div className="flex items-center gap-1 relative">
                            <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-1 cursor-pointer">
                            <img src={userImg} alt="user" className="w-8 h-8 rounded-full"/>
                            <h1 
                                className="text-xl text-[#b8165c] font-bold cursor-pointer" 
                            >
                                {localStorage.getItem("user")}
                            </h1>
                            </div>
                            
                            {showDropdown && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-48">
                                    <Link to="/userProfile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                            </div>
                        ) : (
                            <>
                            <Link to="/login" className="border-2 border-[#b8165c] px-2 py-1 rounded-lg hover:shadow-lg hover:text-gray-500">Login</Link>
                            <Link to="/register" className="bg-[#b8165c] text-white px-2 py-1 rounded-lg hover:shadow-lg hover:bg-[#da6396]">Sign In</Link>
                            </>
                        )
                    }
                   
                </div>
            </div>

            {showMobileMenu && (
                <div className="md:hidden pt-4 pb-2">
                    <div className="flex flex-col gap-4 font-semibold text-xl">
                        <Link to="/" className="hover:text-[#b8165c]">Home</Link>
                        <Link to="/cart" className="hover:text-[#b8165c]">Cart</Link>
                        {user ? (
                            <>
                                <div className="flex items-center gap-1">
                                    <img src={userImg} alt="user" className="w-10 h-10 rounded-full"/>
                                    <h1 className="text-xl text-[#b8165c] font-bold">
                                        {user}
                                    </h1>
                                </div>
                                <Link to="/userProfile" className="hover:text-[#b8165c]">Profile</Link>
                                <Link to="/orders" className="hover:text-[#b8165c]">Orders</Link>
                                <button 
                                    onClick={handleLogout}
                                    className="text-left hover:text-[#b8165c]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="border-2 border-[#b8165c] px-4 py-2 rounded-lg text-center">Login</Link>
                                <Link to="/register" className="bg-[#b8165c] text-white px-4 py-2 rounded-lg text-center">Sign In</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Navbar;