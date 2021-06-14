import React, { useState } from "react";
import AddForm from "./AddForm";
import BookCard from "./BookCard";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

function AddBook() {
  const styles = useStyles();

  return (
    <div>
      <Grid container className={styles.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <h1>Add A New Book</h1>
          </Grid>
          <Grid container justify="center" spacing={10}>
            <Grid item xs={6}>
              <AddForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddBook;
