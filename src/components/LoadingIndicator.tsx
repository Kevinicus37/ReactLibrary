import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
    },
    circle: {
        postition: "absolute",
        marginTop: "45%",
        marginLeft: "45%",
    }
  }),
);

export default function LoadingIndicator() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <CircularProgress className={styles.circle} />
    </div>
  );
}