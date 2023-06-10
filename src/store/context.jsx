import { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";

import capetownBranch from "../components/Meals/Data/churchDa";
import memberS from "../components/Meals/Data/membersData";
import {
  CLEAR_CART,
  REMOVE,
  REMOVE_MEMBER,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
  NEW_BRANCH_DATE,
  UPDATE_ATTENDANCE_RECORD,
  NOTIFICATION_DISPLAY,
  REPLACE_MEMBERS_DATA,
  SUBMITING,
  BRANCH_NAME,
  RELOAD_MEMBERS,
  ADD_MEMBER,
} from "./actions";
import { getTotals } from "../components/Utils/utils";

const AppContext = createContext();

const initialState = {
  logging: false,
  isSubmitting: false,
  cart: new Map(),
  branchs: new Map(capetownBranch.map((branch) => [branch._id, branch])),
  branch_Date: {},
  notification: null,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost, branchName, date, uBaba } = getTotals(
    state.branch_Date,
    state.branchs
  );
  console.log(state);
  const login = state.logging;
  //const { totalAmount, totalCost } = getTotals(state.branchs);
  const setCartAtReducer = (newCart) => {
    dispatch({ type: REPLACE_MEMBERS_DATA, payload: { newCart } });
  };
  const reloadMembers = () => {
    dispatch({ type: RELOAD_MEMBERS });
  };
  const addNewMember = (newMember) => {
    dispatch({ type: ADD_MEMBER, payload: { newMember } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const removeMember = (id, date, BI) => {
    dispatch({ type: REMOVE_MEMBER, payload: { id, date, BI } });
  };

  const increase = (id, attendanceRecord) => {
    dispatch({ type: INCREASE, payload: { id, attendanceRecord } });
  };
  const setIsSubmitting = (status) => {
    dispatch({ type: SUBMITING, payload: { status } });
  };
  const decrease = (id, attendanceRecord) => {
    dispatch({ type: DECREASE, payload: { id, attendanceRecord } });
  };

  // Function to update attendance record
  const updateAttendanceRecord = (branch_Date) => {
    dispatch({ type: UPDATE_ATTENDANCE_RECORD, payload: { branch_Date } });
  };
  const insetData = (attendanceRecord) => {
    dispatch({ type: NEW_BRANCH_DATE, payload: { attendanceRecord } });
  };
  const seach_branch_name = (churchID) => {
    dispatch({ type: BRANCH_NAME, payload: { churchID } });
  };

  const notifications = (status, title, message) => {
    dispatch({
      type: NOTIFICATION_DISPLAY,
      payload: { status, title, message },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        removeMember,
        increase,
        decrease,
        updateAttendanceRecord,
        totalAmount,
        totalCost,
        branchName,
        date,
        uBaba,
        insetData,
        login,
        notifications,
        setCartAtReducer,
        setIsSubmitting,
        seach_branch_name,
        reloadMembers,
        addNewMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
