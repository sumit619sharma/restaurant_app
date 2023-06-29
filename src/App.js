import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart,setShowCart] = useState(false);
   const toggleCart=()=> {
    setShowCart(!showCart);
   }
  return (
    <CartProvider>
    {showCart && <Cart onClick={toggleCart} /> } 
      <Header onShowCart={toggleCart} />
      <main>
        <Meals/>
      </main>
      </CartProvider>
  );
}

export default App;
