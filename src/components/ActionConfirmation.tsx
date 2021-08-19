import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteBookAsync, postBookAsync, selectBookToActOn, selectConfirmationOpen, selectDeletedPath, setConfirmationOpen } from '../features/books/bookSlice';

type DeleteConfirmationProps = {
    isOpen: boolean,
    alertToggler: Function,
}
export default function ActionConfirmation() {
  const dispatch = useAppDispatch();
  const bookToActOn = useAppSelector(selectBookToActOn);
  const open = useAppSelector(selectConfirmationOpen);
  const deletedPath = useAppSelector(selectDeletedPath);
  let pathName = window.location.pathname;
  

  const handleCancel = () => {
    dispatch(setConfirmationOpen(false));
    dispatch(setConfirmationOpen(false));
  };

  const handleOk = () => {
    if (pathName != deletedPath){
    dispatch(deleteBookAsync(bookToActOn));}
    else {
      dispatch(postBookAsync(bookToActOn));
    }
    dispatch(setConfirmationOpen(false));
  };

  let buttonText = pathName != deletedPath ? "Delete" : "Restore";
  let confirmationText = pathName!= deletedPath ? "Confirm that you would like to delete this book." : "Confirm that you would like to restore this book.";
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmationText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>{buttonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}