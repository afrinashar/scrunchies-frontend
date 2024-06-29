import  { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cart'); // Assuming your API endpoint is '/api/cart'
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/?itemId=${itemId}`); // Assuming your API endpoint for deleting items is '/api/cart/'
      // Update cart state after successful deletion
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.itemId !== itemId)
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart ? (
        <div>
          {cart.items.map(item => (
            <div key={item.itemId}>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => removeFromCart(item.itemId)}>Remove</button>
            </div>
          ))}
          <p>Total: ${cart.bill}</p>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
