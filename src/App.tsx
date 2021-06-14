import React, { useState } from "react";
import "./App.css";
import {
  createStyles,
  makeStyles,
  rgbToHex,
  Theme,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Sidenav from "./layout/Sidenav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "./components/Welcome";
import AddBook from "./components/AddBook";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    main: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  }));
  const styles = useStyles();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => (event: any) => {
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
          <Sidenav isOpen={drawerIsOpen} drawerToggler={toggleDrawer} />
          <Switch>
            <Route path="/add">
              <AddBook />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Container>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
