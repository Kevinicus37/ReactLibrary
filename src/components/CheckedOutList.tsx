import { Divider, IconButton, InputLabel, makeStyles, NativeSelect, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPatronBooksAsync, selectPatronBooks, selectRecentlyDeleted } from "../features/books/bookSlice";
import BookCard from "./BookCard";
import SearchIcon from '@material-ui/icons/Search';
import { Pagination } from "@material-ui/lab";
import { CheckInResponse } from "./CheckInResponse";
import { BookInfoResponse } from "./BookInfoResponse";

const useStyles = makeStyles({
  selectLabel: {
    color: "black",
    fontSize: 20,
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  searchComponent: {
    marginLeft: 30,
  },
  Icon: {
    marginTop: 10,
    marginLeft: 30,
  },
  pager: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: 50,
    marginTop: 15,
  },
  pageSize: {
    marginLeft: 30,
  },
});

export default function CheckedOutList() {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const [cardNumber, setCardNumber] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [lastPage, setLastPage] = useState(1);
    const books = useAppSelector(selectPatronBooks);

    useEffect(() => {
    setLastPage(Math.ceil(books.length / pageSize));
  });
  
    const handleSubmit = (event:any) => {
        event.preventDefault();
        dispatch(fetchPatronBooksAsync(cardNumber));
    }

    const handleCardNumberChange = (event: any) => {
        setCardNumber(event.target.value);
    }

    const pageChanger = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    let newPageSize = event.target.value as number;
    setPage(Math.ceil(((page - 1) * pageSize + 1) / newPageSize));
    setPageSize(newPageSize);
    setLastPage(Math.ceil(books.length / newPageSize));
  };

    if (page > lastPage && lastPage > 0) setPage(lastPage);
  let start = (page - 1) * pageSize;
  let resultStart = (page-1) * pageSize + 1;
  let resultStop = page >= lastPage ? books.length : page * pageSize;
  let booksToDisplay = books.slice(start, resultStop);

    return <div>
        <form onSubmit={handleSubmit}>
        <div className={styles.search}>
        <InputLabel className={styles.selectLabel} id="pageSizeLabel">
            Please Enter a patron's card number: 
          </InputLabel>
        <TextField className={styles.searchComponent}
            label="Card Number"
            margin="normal"
            variant="outlined"
            onChange={handleCardNumberChange}
          />
          <div>
          <IconButton
              className={styles.Icon}
              aria-label="addAuthor"
              color="primary"
              onClick={handleSubmit}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
        </div>
        </div>
        <Divider></Divider>
        </form>
        <h1>Return Books</h1>
        {books.length > 0? booksToDisplay.map((book, index) => {
          return (
            <BookCard key={index} book={book}/>
          );
          
        }) : <h3>No Checked Out Books found for the provided Patron.</h3>}
        <div className={styles.pager}>
        <div>
          <Typography>
            {books.length < 1
              ? ""
              : "Page: " +
                page +
                " - Showing Results " +
                resultStart +
                " to " +
                resultStop +
                " of " +
                books.length}
          </Typography>
          {books.length > 0 ? (<Pagination count={lastPage} page={page} onChange={pageChanger} />) : "" }
        </div>
        {books.length > 0? (
        <div className={styles.pageSize}>
          <InputLabel className={styles.selectLabel} id="pageSizeLabel">
            Page Size
          </InputLabel>
          <NativeSelect
            id="pageSize"
            inputProps={{ "aria-label": "Page Size" }}
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="" disabled>
              Page Size
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </NativeSelect>
        </div>) : "" }
        </div>
        <CheckInResponse></CheckInResponse>
        <BookInfoResponse></BookInfoResponse>
      </div>;
}