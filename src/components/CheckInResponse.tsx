import { Backdrop, makeStyles, createStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBookToActOn, selectCheckInResponseIsOpen, selectStatus, setCheckInResponseIsOpen } from "../features/books/bookSlice";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    responseBackdrop: {
      zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    popupTitle: {
        padding: theme.spacing(3),
        color: "white",
      },
    paper2: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "cadetblue",
        "& label.Mui-focused": {
          color: "white",
        },
        borderRadius: 20,
      },
      error: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
        "& label.Mui-focused": {
          color: "white",
        },
      },   
  }),
);
    
export function CheckInResponse() {

const styles = useStyles();
const dispatch = useAppDispatch();
const responseOpen = useAppSelector(selectCheckInResponseIsOpen);
const book = useAppSelector(selectBookToActOn);
const status = useAppSelector(selectStatus);

const handleResponseClose = () => {
    dispatch(setCheckInResponseIsOpen(false));
  }

let messageStyle = status == "failed"? styles.error : styles.paper2;
let message = status == "failed" ? `There was an issue returning ${book.title}. Please try again` : `${book.title} was checked in successfully.`
return <div>
    <Backdrop
        className={styles.responseBackdrop}
        open={responseOpen}
        onClick={handleResponseClose}
      >
        <Paper elevation={5} className={messageStyle}>
          <Typography variant="h5" className={styles.popupTitle}>
            {message}
          </Typography>
          
        </Paper>
      </Backdrop>
      </div>
}