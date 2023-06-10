import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../../store/user_context";

const CartButton = () => {
  const { loginWithRedirect, myUser, logout } = useUserContext();

  return (
    <Wrapper className="cart-btn-wrapper">
      {myUser ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            // clearCart();
            localStorage.removeItem("user");
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: white;
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
  }

  .cart-container {
    color: white;
    display: flex;
    align-items: center;
    position: relative;

    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }

  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: white;
    padding: 12px;
  }

  .auth-btn:hover,
  .auth-btn:active {
    background-color: #2c0d00;
  }

  .auth-btn {
    display: flex;
    color: white;
    align-items: center;
    background: transparent;
    border-color: white;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    border-radius: 25px;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    letter-spacing: var(--spacing);

    svg {
      margin-left: 5px;
    }
  }
`;

export default CartButton;
