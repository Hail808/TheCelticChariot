import { useState, useEffect } from 'react';

//cart counter so everytime product is added to cart, the cart icon at the top right updates with the number of items in cart
export function useCartCount() {
  const [count, setCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      
      if (data.success && data.data) {
        const total = data.data.items.reduce((sum: number, item: any) => 
          sum + item.quantity, 0
        );
        setCount(total);
      } else {
        setCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // listen for cart update events
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // cleanup listener on unmount
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return { count, refreshCount: fetchCartCount };
}