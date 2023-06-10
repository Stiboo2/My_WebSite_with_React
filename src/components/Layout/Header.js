import { Fragment } from "react";
import styled from "styled-components";
import capeImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import CartButtons from "./CartButtons";
import ExpenseDate2 from "./ExpenseDate2";
import { useGlobalContext } from "../../store/context";

const Header = (props) => {
  const { uBaba } = useGlobalContext();
  let dateParts = null;
  let year = null;
  let month = null; // Month is zero-based (0-11)
  let day = null;
  let expenseDate = null;

  if (props.date) {
    dateParts = props.date.split("-");
    year = parseInt(dateParts[0]);
    month = parseInt(dateParts[1]) - 1; // Month is zero-based (0-11)
    day = parseInt(dateParts[2]);

    expenseDate = new Date(year, month, day);
  }
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Cape Town Register</h1>
        <HeaderCartButton onClick={props.onShowCart} />

        {props.date && <ExpenseDate2 date={expenseDate} />}
        <div>
          <h2>{uBaba}</h2>
        </div>
        <CartButtons></CartButtons>
      </header>
      <div>
        <img src={capeImage} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
