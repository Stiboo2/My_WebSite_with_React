import React, { Fragment, useState } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import AttendanceSetup from "../Setup/AttendanceSetup";
import InitSetUp from "../Setup/InitSetUp";
import ExpensesList from "./MealItem/ExpensesList";
import "./MealItem/Expenses.css";
import FilterBar from "../Layout/FilterBar";
import Card from "../UI/Card";
import MemberForm from "./Data/MemberForm";
import "./MealsButton.css";
import { useGlobalContext } from "../../store/context";
import "./Meals.css";

const Meals = () => {
  const [attendanceRecord, setAttendanceRecord] = useState({
    date: "1985-04-07",
    church_branch_id: "branch1",
    pastor_id: "pastor2",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valueFromChild, setValueFromChild] = useState("all");
  const [addMemberButton, setAddMemberButton] = useState(false);
  const { reloadMembers, setIsSubmitting, addNewMember } = useGlobalContext();

  const handleAttendanceChange = (date, churchBranchId, pastor_id) => {
    setAttendanceRecord({ date, church_branch_id: churchBranchId, pastor_id });
    setSubmitted(true);
  };

  const handleValueFromChild = (value) => {
    setValueFromChild(value);
  };

  const MemberHandler = () => {
    setAddMemberButton(!addMemberButton);
  };

  const buttonReloadHandler = () => {
    reloadMembers();
    setIsSubmitting(true);
  };

  const SaveMember = (newMember) => {
    addNewMember(newMember);
    MemberHandler();
  };

  return (
    <div className="meals">
      {" "}
      {/* Wrap Fragment with a parent div and apply the class */}
      {!submitted && (
        <AttendanceSetup onAttendanceChange={handleAttendanceChange} />
      )}
      {submitted && (
        <Fragment>
          <FilterBar onValueChange={handleValueFromChild} />
          {addMemberButton && (
            <MemberForm onConfirm={SaveMember} onCancelMeal={MemberHandler} />
          )}
          {!addMemberButton && (
            <button className="button" onClick={MemberHandler}>
              Add New Member
            </button>
          )}
          {
            <button className="buttonreload" onClick={buttonReloadHandler}>
              Realod Members
            </button>
          }
          <AvailableMeals
            attendanceRecord={attendanceRecord}
            catalog={valueFromChild}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Meals;
