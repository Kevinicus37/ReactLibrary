

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { postBookAsync, selectBooks, selectBookToActOn, selectConfirmationOpen, setConfirmationOpen } from '../features/books/bookSlice';

type DeleteConfirmationProps = {
    isOpen: boolean,
    alertToggler: Function,
}
export default function RestoreConfirmation({isOpen, alertToggler} : DeleteConfirmationProps) {
    const dispatch = useAppDispatch();
    const bookToRestore = useAppSelector(selectBookToActOn);
    const amIOpen = useAppSelector(selectConfirmationOpen);

  const handleCancel = () => {
    dispatch(setConfirmationOpen(false));
  };

  const handleOk = () => {
    dispatch(postBookAsync(bookToRestore));
    dispatch(setConfirmationOpen(false));
  };

  return (
    <div>

      <Dialog
        open={amIOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm that you would like to restore this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Restore
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}