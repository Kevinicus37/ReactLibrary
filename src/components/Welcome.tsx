import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ButtonImage from "./ButtonImage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { isTemplateSpan } from "typescript";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    content: {
      textAlign: "center",
    },
  })
);

const gridItems = [
  {
    url: "https://webstockreview.net/images/handshake-clipart-micro-finance-8.png",
    text: "Issue Library Card",
    link: "/",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/39/Book.svg",
    text: "Add Book",
    link: "/add",
  },
];

function Welcome() {
  const styles = useStyles();

  const items = [];

  for (const { url, text, link } of gridItems) {
    items.push(
      <Grid className={styles.content} item xs={6}>
        <Link to={link}>
          <ButtonImage url={url} />
        </Link>
        {text}
      </Grid>
    );
  }

  return (
    <div>
      <Grid container className={styles.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={10}>
            <Grid item>
              <h1>Welcome to the Library Wizard!</h1>
            </Grid>
            {items}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Welcome;
