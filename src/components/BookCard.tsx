import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia, createStyles, Theme } from "@material-ui/core";
import MissingCover from "../images/missingbook.png";
import OptionsMenu from "./OptionsMenu";
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import Book from "../types/Book";
import { useAppSelector } from "../app/hooks";
import { selectDeletedPath } from "../features/books/bookSlice";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        width: theme.spacing(80),
        height: theme.spacing(25),
      },
      backgroundColor: "steelblue",
      borderRadius: 2,
      marginTop: 20,
      marginBottom: 30,
      position: "relative",
    },
    title: {
      fontSize: 28,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
      width: theme.spacing(20),
      height: 'auto',
      margin: theme.spacing(3),
    },
    content: {
      flex: "1 0 auto",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      color: "white",
    },
    options: {
      position: "absolute",
      bottom: 15,
      right: 15,
    },
    overdue: {
      position: "absolute",
      top: 15,
      right: 15,
      color: "red",
    },
  })
);

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  const styles = useStyles();
  const deletedPath = useAppSelector(selectDeletedPath);
  let path = window.location.pathname;

  let authorsString = book.authors == null ? "" : book.authors.join(", ");
  let mediaUrl =
    "http://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg?default=false";

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = MissingCover;
  };

  const testClick = (event : any) => {
    console.log(event.target.className);
  }
  

  return (
    <Card  className={styles.root} onClick={testClick}>
      <CardMedia
        className={styles.media}
        component="img"
        src={mediaUrl}
        title="cover art"
        onError={handleImageError}
      ></CardMedia>
      <div>
        <div id="clickable" className={styles.details}>
        <CardContent className={styles.content}>
          <Typography  variant="h3" gutterBottom >
            {book.title}
          </Typography>
          <Typography  className={styles.pos}>by: {authorsString}</Typography>
          <Typography className={styles.pos}>Published: {book.publishedYear}</Typography>
          <Typography variant="body2" component="p">
            ISBN: {book.isbn}
          </Typography>
        </CardContent>
        
      </div>
      {book.isOverdue === true && path !== deletedPath? <div className={styles.overdue}><WarningTwoToneIcon fontSize="large"></WarningTwoToneIcon></div> : ""}
      <div className={styles.options}>
        
        <OptionsMenu book={book}></OptionsMenu>
      </div>
      </div>
      
      
    </Card>
  );
}

export default BookCard;
