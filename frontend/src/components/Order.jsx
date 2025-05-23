import { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Order=()=>{
    const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
    useEffect(() => {
       fetchOrders();
   }, []);
    const fetchOrders = async () => {
       try {
           const response = await fetch('https://fooddelivery-d0xd.onrender.com/order', {
               headers: {
                   'Authorization': `Bearer ${localStorage.getItem('token')}`,
                   'Content-Type': 'application/json'
               }
           });
            if (!response.ok) {
               throw new Error('Failed to fetch orders');
           }
            const data = await response.json();
           setOrders(data.orders);
           setLoading(false);
       } catch (error) {
           console.error('Error fetching orders:', error);
           setError(error.message);
           setLoading(false);
       }
   };
    if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
    return(
        <div className="min-h-screen bg-gray-100">
           <Navbar />
           <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
               <h1 className="text-3xl font-bold mb-6 text-center text-[#b8165c] font-vollkorn">Your Orders</h1>
               {orders.map((order) => (
                   <div key={order._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                       <div className="flex justify-between items-center mb-4">
                           {/* <h2 className="text-xl font-semibold">
                               Order #{order._id.slice(-6)}
                           {/* </h2> */}
                           <span className="text-gray-600">
                               {new Date(order.orderDate).toLocaleDateString()}
                           </span>
                           <span className="text-gray-600">
                               {new Date(order.orderDate).toLocaleTimeString()}
                           </span>
                       </div>
                       {order.restaurantOrders.map((ro) => (
                           <div key={ro._id} className="border-t pt-4 mt-4">
                               <h3 className="font-semibold mb-2">{ro.restaurantName}</h3>
                               <div className="space-y-2">
                                   {ro.items.map((item) => (
                                       <div key={item._id} className="flex justify-between">
                                           <span>{item.name} x {item.quantity}</span>
                                           <span>₹{item.price * item.quantity}</span>
                                       </div>
                                   ))}
                               </div>
                               <div className="mt-2 text-right">
                                   <span className="font-semibold">
                                       Subtotal: ₹{ro.subtotal}
                                   </span>
                               </div>
                           </div>
                       ))}
                       <div className="border-t mt-4 pt-4 flex justify-between items-center">
                           <div>
                               <p className="text-gray-600">Status: {order.paymentStatus}</p>
                               <p className="text-gray-600">Payment: {order.paymentMethod}</p>
                           </div>
                           <div className="text-xl font-bold text-[#b8165c]">
                               Total: ₹{order.totalAmount}
                           </div>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    )
}
export default Order;