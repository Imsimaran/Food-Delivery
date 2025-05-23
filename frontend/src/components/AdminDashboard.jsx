import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminDashboard=()=>{
    const id=localStorage.getItem("userId");
    const navigate = useNavigate();
    return(
        <div className="w-full m-auto">
            <AdminNav/>
            <div className="flex items-center flex-wrap justify-center gap-4 h-[calc(100vh-74px)]">
                <button className="bg-[#b8165c] text-2xl font-bold text-white px-4 rounded-md h-40 w-70" onClick={()=>navigate(`/admin/restaurant/${id}`)}>Manage Food Items</button>
                <button className="bg-[#b8165c] text-2xl font-bold text-white px-4 rounded-md h-40 w-70" onClick={()=>navigate(`/admin/add-food-item/${id}`)}>Add Food Item</button>
                <button className="bg-[#b8165c] text-2xl font-bold text-white px-4 rounded-md h-40 w-70" onClick={()=>navigate(`/admin/orders/${id}`)}>View Orders</button>
            </div>
        </div>
    )
}

export default AdminDashboard;