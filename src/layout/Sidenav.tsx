import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import { BrowserRouter as Router, Link } from "react-router-dom";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { clearPatronBooks } from "../features/books/bookSlice";
import { useAppDispatch } from "../app/hooks";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 250,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(66,66,66)",
  },
  link: {
    color: "white",
    marginRight: 10,
    marginBottom: 0,
  },
  drawerContentStyle: {
    width: 250,
    color: "rgb(255, 255, 255)",
  },
  drawerBackgroundStyle: {
    backgroundColor: "rgb(66, 66, 66)",
  },
}));

type SidenavProps = {
  isOpen: boolean;
  drawerToggler: Function;
  handleCheckedOutEntry: Function;
};

export const Sidenav = ({ isOpen, drawerToggler, handleCheckedOutEntry}: SidenavProps) => {
  const styles = useStyles();
  //const dispatch = useAppDispatch();
  
  // const handleCheckedOutEntry = () => (event: any) => {    
  //   if (
  //     event.type === "keydown" &&
  //     ((event as React.KeyboardEvent).key === "Tab" ||
  //       (event as React.KeyboardEvent).key === "Shift")
  //   ) {
  //     return;
  //   }

  //   dispatch(clearPatronBooks(0));
  //   drawerToggler(false)  }

  return (
    <Drawer
      classes={{ paper: styles.drawerBackgroundStyle }}
      anchor="left"
      open={isOpen}
      onClose={drawerToggler(false)}
    >
      <div className={styles.drawer}>
        <List component="nav" aria-label="Main Navigation">
          <ListItem
            button
            component={Link}
            to="/"
            onClick={drawerToggler(false)}
          >
            <HomeIcon className={styles.link} />
            <ListItemText className={styles.link}>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/add"
            onClick={drawerToggler(false)}
          >
            <LibraryAddIcon className={styles.link} />
            <ListItemText className={styles.link}>Add Books</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/checked_out"
            onClick={handleCheckedOutEntry(false)}
          >
            <LibraryAddCheckIcon className={styles.link} />
            <ListItemText className={styles.link}>Return Books</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/deleted"
            onClick={drawerToggler(false)}
          >
            <DeleteSweepIcon className={styles.link} />
            <ListItemText className={styles.link}>Recently Deleted</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/patrons"
            onClick={drawerToggler(false)}
          >
            <CreditCardIcon className={styles.link} />
            <ListItemText className={styles.link}>Patrons</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidenav;
