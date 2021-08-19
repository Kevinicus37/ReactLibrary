import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  checkoutBook,
  removeFromAvailableBooks,
  removeFromFilteredBooks,
  selectBookToActOn,
  selectCardNumberEntryIsOpen,
  setCardNumberEntryIsOpen,
  setCheckedoutBook,
  setCheckoutResponseOpen,
  setDueDate,
} from "../features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export const CheckoutButton = () => {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    text: {
        textTransform: "none",
        color: "lightgray",
    },
    responseBackdrop: {
      zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.1)",
      },
      inputField: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(5),
        width: "55%",
      },
      multilineColor: {
        color: "white",
      },
      labelStyles: {
        color: "white",
      },
      popupTitle: {
        padding: theme.spacing(5),
        color: "white",
      },
      closeIcon: {
        color: "white",
        alignSelf: "flex-end",
        padding: theme.spacing(1),
      },
      buttonStyle: {
        height: "30%",
        margin: theme.spacing(3),
        color: "white",
        borderColor: "white",
        "&:hover": {
          backgroundColor: "slategray",
          color: "white",
          borderColor: "white",
        },
      },
      paper2: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "steelblue",
        "& label.Mui-focused": {
          color: "white",
        },
      },   
  }),
);

  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [libraryCardNumber, setLibraryCardNumber] = useState("");
  const book = useAppSelector(selectBookToActOn);
  const open = useAppSelector(selectCardNumberEntryIsOpen);

  const handleClose = () => {
    dispatch(setCardNumberEntryIsOpen(false));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLibraryCardNumber(event.target.value);
  };

  const handleFinalCheckoutClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let checkoutData = {
      BookId: book.bookId,
      CardNumber: libraryCardNumber,
    };

    const response = await dispatch(checkoutBook(checkoutData));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(removeFromAvailableBooks(book));
      dispatch(removeFromFilteredBooks(book));
      dispatch(setCheckoutResponseOpen(true));
      dispatch(setCheckedoutBook(book));
      dispatch(setDueDate(response.payload.dueDate));
      dispatch(setCardNumberEntryIsOpen(false));
    }
  };

  return (
    <div>
      <Backdrop className={styles.backdrop} open={open}>
          
        <Paper elevation={5} className={styles.paper2}>
          <IconButton
            size="small"
            onClick={handleClose}
            className={styles.closeIcon}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" className={styles.popupTitle}>
            Enter the Patron's library card number:
          </Typography>
          <form onSubmit={handleFinalCheckoutClick}>
            <TextField
              label="Library Card Number"
              type="name"
              onChange={handleCardNumberChange}
              value={libraryCardNumber}
              className={styles.inputField}
              variant="standard"
              required={true}
              InputProps={{
                className: styles.multilineColor,
              }}
              InputLabelProps={{ className: styles.labelStyles }}
            />
            <Button
              className={styles.buttonStyle}
              variant="outlined"
              type="submit"
            >
              Checkout
            </Button>
          </form>
        </Paper>
      </Backdrop>
      
    </div>
  );
};
export default CheckoutButton;

