import React, { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Sidenav from "./layout/Sidenav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "./components/Welcome";
import AddBook from "./components/AddBook";
import BookCard from "./components/BookCard";
import { clearPatronBooks, fetchAvailableBooksAsync, fetchBooksAsync, selectBookInfoResponseIsOpen, selectBooks, selectStatus } from "./features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Book from "./types/Book";
import BookList from "./components/BookList";
import DeletedList from "./components/DeletedList";
import { AddLibraryCard } from "./components/AddPatron";
import CheckedOutList from "./components/CheckedOutList";
import ErrorPage from "./components/ErrorPage";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    main: {
      marginTop: 75,
      marginBottom: 150,
    },
    Select: {
      martginTop: 25,
      marginBottom: 10,
    },
    Pager: {
      marginTop: 15,
      marginBottom: 35,
    },
  }));

  const bookInfoResponseIsOpen = useAppSelector(selectBookInfoResponseIsOpen);
  const styles = useStyles();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchBooksAsync());
    dispatch(fetchAvailableBooksAsync());
  }, []);

  const books: Book[] = useAppSelector(selectBooks);

  const handleCheckedOutEntry = (isOpen: boolean) => (event: any) => {
    console.log("checked out entry");
    
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    dispatch(clearPatronBooks(0));
    setDrawerIsOpen(isOpen);
  }

  const toggleDrawer = (isOpen: boolean) => (event: any) => {
    console.log("toggler");
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerIsOpen(isOpen);
  };

  return (
    <div className={styles.root}>
      <Header drawerToggler={toggleDrawer} />

      <Router>
        <Container component="main" className={styles.main} maxWidth="md">
          <Sidenav isOpen={drawerIsOpen} drawerToggler={toggleDrawer} handleCheckedOutEntry={handleCheckedOutEntry}/>
          <Switch>
            <Route path="/add">
              <AddBook />
            </Route>
            <Route path="/deleted">
              <DeletedList />
            </Route>
            <Route path="/patrons">
              <AddLibraryCard />
            </Route>
            <Route path="/checked_out">
              <CheckedOutList />
            </Route>
            <Route path="/">
              {status == "failed" ? <ErrorPage></ErrorPage> : <BookList></BookList>} 
            </Route>
          </Switch>
        </Container>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
