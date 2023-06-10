import { useRef, useState } from "react";

import "./MemberForm.css";
import classes from "./MemberForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim() === "";
const MemberForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      title: enteredStreet,
      image: enteredCity,
      branch: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const cancelHandler = () => {
    {
      props.onCancelMeal();
    }
  };
  return (
    <form className={classes.forma} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name and Surname</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Image</label>
        <input
          type="file"
          id="city"
          ref={cityInputRef}
          directory="true" // Update the attribute to directory="true"
          webkitdirectory="true" // Add webkitdirectory="true"
        />
        {!formInputsValidity.city && (
          <p>Please select a valid image from the folder!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Title</label>
        <select id="street" ref={streetInputRef}>
          <option value="Dade">Dade</option>
          <option value="Mzalwane">Mzalwane</option>
          <option value="Baba Priest">Baba Priest</option>
          <option value="Mama Mshumayeli">Mama Mshumayeli</option>
        </select>
        {!formInputsValidity.street && (
          <p>Please select a valid option for the street!</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Branch</label>
        <select id="postal" ref={postalCodeInputRef}>
          <option value="Dunoon">Dunoon</option>
          <option value="Paarl">Paarl</option>
          <option value="Mfuleni">Mfuleni</option>
          <option value="Caprocon">Caprocon</option>
        </select>
        {!formInputsValidity.postalCode && <p>Please select a valid branch!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default MemberForm;
