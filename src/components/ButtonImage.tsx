import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      alignContent: "center",
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    image: {
      maxHeight: 100,
      maxWidth: 75,
      marginTop: "15%",
    },
  })
);

type ButtonImageProps = {
  url: string;
};

export default function ButtonImage({ url }: ButtonImageProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Paper elevation={3}>
        <img className={styles.image} src={url}></img>
      </Paper>
    </div>
  );
}
