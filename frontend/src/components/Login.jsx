import { Link, useNavigate } from "react-router-dom";
import food_login from "../assets/food_login.png";
import { useState } from "react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch("https://fooddelivery-d0xd.onrender.com/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(res.ok){
      const data=await res.json();
      localStorage.setItem("user", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      // console.log(data);
      if(data.role==="admin"){
        navigate("/admin");
      }
      else{
        navigate("/");
      }
    }
    else{
      setError("Login failed. Please try again.");
    }
}

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="w-full md:w-1/2 md:h-full h-1/2">
        <img
          src={food_login}
          alt="login"
          className="w-full md:h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center px-10 bg-gradient-to-br from-white/50 to-white/30">
        <div className="w-full max-w-md backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-lg border border-white/30">
          <form>
            <h1 className="text-2xl md:text-3xl font-bold font-dancing text-center mb-2 text-[#b8165c]">
              BeFoodie
            </h1>
            <p className="text-gray-500 font-semibold text-center mb-5 underline">{error}</p>
            <div className="relative mt-5 py-2 ">
              <label className="text-lg font-vollkorn font-bold text-[#b8165c] absolute -top-3 left-2 bg-white">Username</label>
              <input type="text" 
                placeholder="Enter Your Username" 
                className="w-full p-2 text-md font-literata border border-white/50 rounded-lg bg-white/50 outline-none"
                onChange={handleUsername}
                required  
                />
            </div>

            <div className="relative mt-5 py-2">
              <label className="text-lg font-vollkorn font-bold text-[#b8165c] absolute -top-3 left-2 bg-white">Password</label>
              <input type="password" 
                placeholder="Enter Password" 
                className="w-full p-2 text-md font-literata border border-white/50 rounded-lg bg-white/50 outline-none"
                onChange={handlePassword}
                required
                />
            </div>

            <p className="text-md text-black py-3">Don't have an account? <Link to="/register" className="font-bold text-[#b8165c] hover:underline">Register Here</Link></p>
            <button onClick={handleSubmit} type="submit" className="bg-[#b8165c] w-full shadow-lg text-white px-4 py-2 rounded-lg mt-5 font-bold">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

