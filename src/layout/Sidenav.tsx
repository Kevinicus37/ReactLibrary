import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
};

export const Sidenav = ({ isOpen, drawerToggler }: SidenavProps) => {
  const styles = useStyles();

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
            <HomeIcon className={styles.link} />
            <ListItemText className={styles.link}>Add Books</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidenav;
