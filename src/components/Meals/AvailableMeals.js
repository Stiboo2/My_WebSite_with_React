import Card from "../UI/Card";
import React from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import ExpensesList from "./MealItem/ExpensesList";
import { useGlobalContext } from "../../store/context";
import MemberForm from "./Data/MemberForm";

const AvailableMeals = ({ attendanceRecord, catalog }) => {
  const { cart, clearCart, totalCost, totalAmount, login } = useGlobalContext();
  const cartArray = Array.from(cart.entries());
  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ExpensesList
          members={cartArray}
          attendanceRecord={attendanceRecord}
          catalog={catalog}
        />
      </Card>
    </section>
  );
};
export default AvailableMeals;
