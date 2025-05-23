import { Link, useNavigate } from "react-router-dom";
import food_login from "../assets/food_login.png";
import { useState } from "react";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};

    if (!fullname.trim()) validationErrors.fullname = "Full name is required.";
    if (!username.trim()) validationErrors.username = "Username is required.";
    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address.";
    }
    if (!password.trim()) validationErrors.password = "Password is required.";
    if (!address.trim()) validationErrors.address = "Address is required.";
    if (!phone.trim()) {
      validationErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      validationErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("https://fooddelivery-d0xd.onrender.com/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          address,
          phone,
        }),
      });
      const data = await response.json();

      if (data.error) {
        setSuccMsg(data.message);
        return;
      }

      setSuccMsg("User registered successfully. Kindly login!!!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setSuccMsg("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="w-full md:w-1/2 md:h-full h-1/2">
        <img
          src={food_login}
          alt="login"
          className="w-full md:h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center py-6 px-4 md:px-8 bg-gradient-to-br from-white/50 to-white/30">
        <div className="w-full max-w-md backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-lg border border-white/30">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl md:text-3xl font-bold font-dancing text-center mb-4 text-[#b8165c]">
              BeFoodie
            </h1>
            <p className="text-center text-lg py-4 font-vollkorn font-bold text-gray-500">
              {succMsg}
            </p>

            {[
              { label: "Name", value: fullname, setValue: setFullname, error: errors.fullname },
              { label: "Username", value: username, setValue: setUsername, error: errors.username },
              { label: "Email", value: email, setValue: setEmail, type: "email", error: errors.email },
              { label: "Password", value: password, setValue: setPassword, type: "password", error: errors.password },
              { label: "Address", value: address, setValue: setAddress, error: errors.address },
              { label: "Phone", value: phone, setValue: setPhone, type: "text", error: errors.phone },
            ].map(({ label, value, setValue, type = "text", error }, index) => (
              <div className="relative mt-5 py-2" key={index}>
                <label className="text-lg font-vollkorn font-bold text-[#b8165c] absolute -top-3 left-2 bg-white">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={`Enter Your ${label}`}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full p-2 text-md font-literata border border-white/50 rounded-lg bg-white/50 outline-none"
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            ))}

            <p className="text-md text-black py-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#b8165c] hover:underline"
              >
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#b8165c] w-full shadow-lg text-white px-4 py-2 rounded-lg mt-5 font-bold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
