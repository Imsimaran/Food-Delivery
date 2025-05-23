import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

const AdminOrders = () => {
    const [order, setOrder] = useState([]);
    const [editOrderId, setEditOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const id = localStorage.getItem("restaurantId");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:3030/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            console.log("data",data);
            setOrder(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <AdminNav />
            <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-[#b8156c] mt-8">Order Details</h1>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#f3f3f3] text-center text-lg">
                            <th className="border border-gray-300 px-4 py-2">Order ID</th>
                            <th className="border border-gray-300 px-4 py-2">Order Date</th>
                            <th className="border border-gray-300 px-4 py-2">Order Time</th>
                            <th className="border border-gray-300 px-4 py-2">User ID</th>
                            <th className="border border-gray-300 px-4 py-2">Items Ordered</th>
                            <th className="border border-gray-300 px-4 py-2">Delivery Address</th>
                            <th className="border border-gray-300 px-4 py-2">Order Status</th>
                            <th className="border border-gray-300 px-4 py-2">Payment Method</th>
                            <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-gray-700">
                        {order.map((order) =>
                            order.restaurantOrders
                                .filter((restOrder) => restOrder.restaurantId === id)
                                .map((restOrder) => (
                                    <tr key={restOrder._id} className="hover:bg-[#f9f9f9]">
                                        <td className="border border-gray-300 px-4 py-2">{restOrder._id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(order.orderDate).toLocaleTimeString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.userId}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {restOrder.items.map((item) => (
                                                <div key={item._id} className="flex justify-between">
                                                    {item.name}
                                                    <span>({item.quantity})</span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{`${order.deliveryAddress.address}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.pincode}`}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {editOrderId === restOrder._id ? (
                                                <select
                                                    value={newStatus}
                                                    onChange={(e) => setNewStatus(e.target.value)}
                                                    className="mt-2 border border-[#b8156c] px-2 py-1 rounded-md text-[#b8156c]"
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                    <option value="preparing">preparing</option>
                                                    <option value="outForDelivery">Out For Delivery</option>
                                                </select>
                                            ) : (
                                                restOrder.status
                                            )}
                                            {editOrderId !== restOrder._id ? (
                                                <button
                                                   
                                                    className="mt-2 border border-[#b8156c] px-2 py-1 rounded-md text-white bg-[#b8156c] hover:bg-white hover:text-[#b8156c]"
                                                >
                                                    Edit
                                                </button>
                                            ) : (
                                                <div className="flex flex-col gap-1 mt-2">
                                                    <button
                                                      
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-green-500 text-white px-2 py-1 rounded-md"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.paymentStatus}</td>
                                        <td className="border border-gray-300 px-4 py-2">₹{restOrder.subtotal}</td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;