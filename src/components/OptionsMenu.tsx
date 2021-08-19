
    import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToAvailableBooks, addToFilteredBooks, checkInBook, fetchBookInfoAsync, selectAvailableBooks, selectCheckoutedBook, selectCheckoutResponseOpen, selectDeletedPath, selectDueDate, selectRecentlyDeleted, setBookInfoResponseIsOpen, setBookToActOn, setCardNumberEntryIsOpen, setCheckInResponseIsOpen, setCheckoutResponseOpen, setConfirmationOpen } from '../features/books/bookSlice';
import Book from '../types/Book';
import ActionConfirmation from './ActionConfirmation';
import CheckoutButton from './CheckoutButton';
import { CheckoutResponse } from './CheckoutResponse';

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
  }),
);

type OptionsMenuProps = {
    book: Book,
}
export default function OptionsMenu({book} : OptionsMenuProps) {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const deletedPath = useAppSelector(selectDeletedPath);
  const availableBooks = useAppSelector(selectAvailableBooks);
  const recentlyDeletedBooks = useAppSelector(selectRecentlyDeleted);
  let pathname = window.location.pathname;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleOptionClick = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    dispatch(setBookToActOn(book));
    dispatch(setConfirmationOpen(true));
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleCheckoutButtonClick = () => {
    dispatch(setCardNumberEntryIsOpen(true));
    dispatch(setBookToActOn(book));
  };

  const handleMoreInfoClick = async () => {
    const response = await dispatch(fetchBookInfoAsync(book.bookId));
    if (response.meta.requestStatus == "fulfilled")
    dispatch(setBookInfoResponseIsOpen(true));
  }

  const handleCheckinButtonClick = async () => {
    const response = await dispatch(checkInBook(book.bookId));
        dispatch(setBookToActOn(book));
        dispatch(setCheckInResponseIsOpen(true));
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  let optionText = pathname != deletedPath ? "Delete" : "Restore";
  return (
    <div className={styles.root}>
        <Button className={styles.text}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >Options...</Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='top'>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleOptionClick}>{optionText}</MenuItem>
                    {availableBooks.some(b => b.bookId == book.bookId) ? <MenuItem onClick={handleCheckoutButtonClick}>Check-Out</MenuItem> : "" }
                    {pathname == "/checked_out" ? <MenuItem onClick={handleCheckinButtonClick}>Check-In</MenuItem> : ""}
                    {availableBooks.some(b=>b.bookId == book.bookId) || recentlyDeletedBooks.some(b=>b.bookId == book.bookId) ? "" : <MenuItem onClick={handleMoreInfoClick}>More Info</MenuItem>}
                  </MenuList>
                </ClickAwayListener>
                <ActionConfirmation></ActionConfirmation>
       
              </Paper>
        </Popper>
      <CheckoutButton></CheckoutButton>
      <CheckoutResponse></CheckoutResponse>
      
    </div>
  );
}


