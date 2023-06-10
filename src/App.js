import { Fragment, useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useGlobalContext } from "./store/context";
import Footer from "./components/Footer/Footer";
import { useUserContext } from "./store/user_context";
import Notification from "./components/UI/Notification";

let isInitial = true;
let isInitial2 = true;

function App(props) {
  const { myUser } = useUserContext();
  const {
    loading,
    setCartAtReducer,
    cart,
    notifications,
    notification,
    isSubmitting,
    setIsSubmitting,
    date,
  } = useGlobalContext();
  const [cartIsShown, setCartIsShown] = useState(false);

  //_______________loading____________________________
  const fetchCartData = async () => {
    try {
      console.log("inside fetchCartData function");
      const response = await fetch(
        "https://church-e98c4-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      console.log("cart data Fetched success.........");

      return data || [];
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await fetchCartData();
      console.log("cartData", cartData);
      setCartAtReducer(cartData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("cart", cart);
  }, []);

  ////  _________________________________sending__________

  useEffect(() => {
    const sendCartData = async () => {
      const memberS = Array.from(cart.entries()).map(([id, item]) => ({
        id,
        ...item,
      }));
      notifications("pending", "Sending...", "Sending cart data!");
      const response = await fetch(
        "https://church-e98c4-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(memberS),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      setIsSubmitting(false);
      notifications("success", "Success!", "Sent cart data successfully!");
    };

    console.log("knock knock ");

    // Rest of your code...
    // First condition
    if (isInitial) {
      isInitial = false;
      console.log("First condition");
      return;
    }

    // Second condition
    if (isInitial2) {
      isInitial2 = false;
      console.log("Second condition");
      return;
    }

    if (cart.size === 0) {
      // Cart is empty, no need to send data
      console.log("Cart is empty, no need to send data");
      return;
    }
    sendCartData().catch((error) => {
      notifications("error", "Error!", "Sending cart data failed!");
    });
  }, [isSubmitting]);

  const showCartHandler = () => {
    if (!myUser) {
      window.alert("Please login to view your cart.");
    } else {
      setCartIsShown(true);
    }
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <main>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} date={date} />
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {myUser && <Meals />}
      <Footer></Footer>
    </main>
  );
}

export default App;
