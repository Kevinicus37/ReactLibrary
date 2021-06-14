import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  }));

type HeaderProps = {
    drawerToggler: Function
};

  export const Header = ({drawerToggler}: HeaderProps) => {
    const styles = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={drawerToggler(true)}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;