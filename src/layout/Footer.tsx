import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[800],
    textAlign: "center",
    color: "white",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  },
}));

function Copyright() {
  return (
    <Typography variant="body2">
      {"Copyright © "}
      <Link color="inherit" href="https://johnfortelibrary.org/">
        John Forte Library
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Footer = () => {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
