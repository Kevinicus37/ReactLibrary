import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, InputLabel, MenuItem, NativeSelect,  Select } from "@material-ui/core";
import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { addPatronAsync } from "../features/books/bookSlice";
import SelectUSState from "../Data/states.json";

export const AddLibraryCard = () => {
  const useStyles = makeStyles({
    formStyle: {
      marginLeft: "5vw",
      marginTop: "10vh",
      width: "60vw",
      height: "inehrit",
    },
    textField: {
      width: "20vw",
      marginTop: 0,
      marginRight: 0,
    },
    button: {
      marginTop: "5vh",
    },
    root: {
      maxHeight: "inherit",
      boxSizing: "border-box",
      //overflowY: "scroll",
    },
  });

  const classes = useStyles();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Handling submit");
    const response = await dispatch(
      addPatronAsync({
        FirstName: fName,
        LastName: lName,
        PhoneNumber: PhoneNumber,
        StreetAddress: streetAddress,
        City: city,
        State: state,
        ZipCode: zipCode,
        Email: Email,
      })
    );

    if (response.meta.requestStatus === "fulfilled") {
      setErrorMessage("The card was added successfully. Your card number is: " + response.payload.addedLibraryCard.cardNumber);
      setOpen(true);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setFName("");
      setLName("");
      setStreetAddress("");
      setCity("");
      setZipCode("");
      setEmail("");
      setPhoneNumber("");
      setState("");
    } else {
      setErrorMessage("There was an issue adding the new patron. Please try again.");
      setOpen(true);
    }
  };

  const handleFNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFName(event.target.value);
  };

  const handleLNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLName(event.target.value);
  };

  const handleStreetAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStreetAddress(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as string);
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root} id="root">
      <form
        className={classes.formStyle}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <h1>Add a New Patron</h1>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              id="fName"
              name="fName"
              label="First Name"
              value={fName}
              className={classes.textField}
              onChange={handleFNameChange}
              required
              //onInvalid={nameErrorMessage}
            />
            <span>{nameError}</span>
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="lName"
              name="lName"
              value={lName}
              label="Last Name"
              onChange={handleLNameChange}
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              label="Phone Number"
              value={PhoneNumber}
              onChange={handlePhoneNumberChange}
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Email"
              type="email"
              value={Email}
              onChange={handleEmailChange}
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              label="Street Address"
              value={streetAddress}
              type="text"
              className={classes.textField}
              onChange={handleStreetAddressChange}
              required
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="City"
              value={city}
              className={classes.textField}
              onChange={handleCityChange}
              required
            />
          </Grid>
          <Grid item xs={5}>
            <InputLabel>State</InputLabel>
            <NativeSelect id="States" inputProps={{ "aria-label": "State"}}
            value={state}
            className={classes.textField}
            onChange={handleStateChange}
            required
            >
            <option value="" disabled>Select State</option>
              {SelectUSState.map((state) => (
                <option value={state.abbreviation}>
                  {state.abbreviation}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Zip Code"
              value={zipCode}
              className={classes.textField}
              onChange={handleZipChange}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message={errorMessage}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const Form = connect(null, useAppDispatch)(AddLibraryCard);
export default Form;