import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
  },
});

type BookCardProps = {
  title: string;
  author: string;
  publication: string;
  isbn: string;
};

function BookCard({ title, author, publication, isbn }: BookCardProps) {
  const styles = useStyles();

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography className={styles.title} gutterBottom>
          {title}
        </Typography>
        <Typography className={styles.pos} color="textSecondary">
          {author}
        </Typography>
        <Typography className={styles.pos} color="textSecondary">
          {publication}
        </Typography>
        <Typography variant="body2" component="p">
          {isbn}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Confirm Add</Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;
