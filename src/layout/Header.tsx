import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

const useStyles = makeStyles((theme) => ({
  local: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  bar: {
    backgroundColor: 'steelblue',
  }
}));

type HeaderProps = {
  drawerToggler: Function;
};

export const Header = ({ drawerToggler }: HeaderProps) => {
  const styles = useStyles();

  return (
    <AppBar className={styles.bar} position="relative">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={drawerToggler(true)}
        >
          <MenuIcon />
          <LocalLibraryIcon className={styles.local} fontSize="large" />
          John Forte Library
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
