import TextField from "@material-ui/core/TextField";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AuthorInput from "./AuthorInput";
import React, { ReactEventHandler, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      "& > *": {
        margin: theme.spacing(1, 1),
      },
    },
    textField: {
      width: 200,
      color: "black",
    },
    AuthorAdd: {
      display: "flex",
      justifycontent: "center",
      alignItems: "center",
    },
    AddIcon: {
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    },
    Icon: {
      maxHeight: 20,
      maxWidth: 20,
    },
    Component: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function AddForm() {
  const styles = useStyles();

  const [count, setCount] = useState(0);
  const [names, setNames] = useState([""]);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let bookInfo = {
      Title: title,
      AuthorNames: names,
      YearPublished: year,
      Isbn: isbn,
    };

    //console.log(names);
    fetch("https://localhost:44345/api/Books", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(bookInfo),
    }).then((response) => response.json());
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let authors = names;
    let index = event.target.id;
    authors[parseInt(index)] = event.target.value;
    setNames(authors);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <div className={styles.Component}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <div className={styles.textField}>
          <FormControl fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </FormControl>
        </div>
        <div className={styles.AuthorAdd}>
          <div className={styles.textField}>
            <AuthorInput index={0} changeHandler={handleAuthorChange} key={0} />
          </div>
          <div className={styles.AddIcon}>
            <IconButton
              className={styles.Icon}
              aria-label="addAuthor"
              color="primary"
              onClick={() => setCount(count + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton
              className={styles.Icon}
              aria-label="subtractAuthor"
              color="primary"
              onClick={() => {
                if (count > 0) {
                  setCount(count - 1);
                  names.pop();
                  setNames(names);
                }
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div className={styles.textField}>
          {[...Array(count)].map((_, i) => (
            <AuthorInput
              index={i + 1}
              changeHandler={handleAuthorChange}
              key={i + 1}
            />
          ))}
        </div>

        <div className={styles.textField}>
          <FormControl fullWidth>
            <InputLabel htmlFor="publication">Year</InputLabel>
            <Input
              id="publication"
              name="publication"
              onChange={handleYearChange}
            />
          </FormControl>
        </div>
        <div className={styles.textField}>
          <FormControl fullWidth>
            <InputLabel htmlFor="isbn">ISBN</InputLabel>
            <Input
              id="0"
              name="isbn0"
              key={0}
              value={isbn}
              onChange={handleIsbnChange}
            />
          </FormControl>
        </div>

        <Button type="submit" color="primary">
          Add Book
        </Button>
      </form>
    </div>
  );
}
export default AddForm;
