import { Backdrop, makeStyles, createStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBookToActOn, selectCheckoutResponseOpen, selectDueDate, setCheckoutResponseOpen } from "../features/books/bookSlice";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    responseBackdrop: {
      zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    popupTitle: {
        padding: theme.spacing(5),
        color: "white",
      },
    paper2: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "cadetblue",
        "& label.Mui-focused": {
          color: "white",
        },
      },   
  }),
);
    
export function CheckoutResponse() {

const styles = useStyles();
const dispatch = useAppDispatch();
const responseOpen = useAppSelector(selectCheckoutResponseOpen);
const dueDate = useAppSelector(selectDueDate);
const book = useAppSelector(selectBookToActOn);

const handleResponseClose = () => {
    dispatch(setCheckoutResponseOpen(false));
  }

return <div>
    <Backdrop
        className={styles.responseBackdrop}
        open={responseOpen}
        onClick={handleResponseClose}
      >
        <Paper elevation={5} className={styles.paper2}>
          <Typography variant="h5" className={styles.popupTitle}>
            {book.title} was checked out successfully.
          </Typography>
          <Typography variant="body2" className={styles.popupTitle}>
            The due date is {dueDate}
          </Typography>
        </Paper>
      </Backdrop>
      </div>
}