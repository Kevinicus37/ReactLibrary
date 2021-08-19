import { Backdrop, makeStyles, createStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBookInfoResponseIsOpen, selectStatus, setBookInfoResponseIsOpen, selectBookInfo } from "../features/books/bookSlice";


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
      info: {
          padding: theme.spacing(4),
          paddingTop: 0,
          color: "white",
      }   
  }),
);
    
export function BookInfoResponse() {

const styles = useStyles();
const dispatch = useAppDispatch();
const responseOpen = useAppSelector(selectBookInfoResponseIsOpen);
const bookInfo = useAppSelector(selectBookInfo);
const status = useAppSelector(selectStatus);

const handleResponseClose = () => {
    dispatch(setBookInfoResponseIsOpen(false));
  }
console.log(bookInfo.checkedOutInfo.name);
let messageStyle = status == "failed"? styles.error : styles.paper2;
let messageHeader = `This book has been checked out by:`;
let message = `${bookInfo.checkedOutInfo.name}
${bookInfo.checkedOutInfo.address}
Phone: ${bookInfo.checkedOutInfo.phoneNumber}
Email: ${bookInfo.checkedOutInfo.email}
Due Date: ${bookInfo.dueDate}`
return <div>
    <Backdrop
        className={styles.responseBackdrop}
        open={responseOpen}
        onClick={handleResponseClose}
      >
        <Paper elevation={5} className={messageStyle}>
          <Typography variant="h5" className={styles.popupTitle}>
            {messageHeader}
          </Typography>
          <div className={styles.info}>
          <Typography>Name: {bookInfo.checkedOutInfo.name}</Typography>
          <Typography>Address: {bookInfo.checkedOutInfo.address}</Typography>
          <Typography variant="body2" component="p">
            Phone Number: {bookInfo.checkedOutInfo.phoneNumber}
          </Typography>
          <Typography>Email: {bookInfo.checkedOutInfo.email}</Typography>
          <Typography>Checked-Out On: {bookInfo.checkedOutDate}</Typography>
          <Typography>Due On: {bookInfo.dueDate}</Typography>
          </div>
        </Paper>
      </Backdrop>
      </div>
}