import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../store/context";
import classes from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { FaChurch } from "react-icons/fa";
import "./CartIcon.css";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHightlighted] = useState(false);

  const { totalAmount, branchName } = useGlobalContext();

  const btnClasses = `${classes.btnClasses} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (false) {
      return;
    }
    setBtnIsHightlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHightlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.text}>{branchName}</span>
      <span className={classes.icon}>
        <FaChurch className="cart-icon" />
      </span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};
export default HeaderCartButton;
