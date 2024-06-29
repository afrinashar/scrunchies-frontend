// Import necessary modules
import  { useState, useEffect } from 'react';
import axios from 'axios';

// Define functional component
const OrdersPage = () => {
  // State to hold orders
  const [orders, setOrders] = useState([]);

  // Function to fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders');
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {/* Display order details */}
            <p>Order ID: {order._id}</p>
            <p>Amount: {order.bill}</p>
            {/* Add more order details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export component
export default OrdersPage;
