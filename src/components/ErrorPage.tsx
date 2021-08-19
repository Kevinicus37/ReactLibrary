import { createStyles, makeStyles, Theme } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { fetchAvailableBooksAsync, fetchBooksAsync } from '../features/books/bookSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        width: theme.spacing(80),
        height: theme.spacing(25),
      },
      borderRadius: 2,
      marginTop: 20,
      marginBottom: 30,
      position: "relative",
    },
    
  })
);

export default function ErrorPage() {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await dispatch(fetchBooksAsync);
        await dispatch(fetchAvailableBooksAsync());
      };
      fetchData();
    }, 30000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

return <div className={styles.root}>
    <BugReportIcon></BugReportIcon>
<h1>An error occurred while loading this page. Please wait or try again later.</h1>
</div>;
}