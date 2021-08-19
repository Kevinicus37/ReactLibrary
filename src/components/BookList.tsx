import {
  InputLabel,
  makeStyles,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectFilteredBooks } from "../features/books/bookSlice";
import BookCard from "./BookCard";
import SearchOptions from "./SearchOptions";
import BookListGeneric from "./BookListGeneric";
import { BookInfoResponse } from "./BookInfoResponse";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    justifyContent: "center",
    display: "grid",
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
    marginLeft: 20,
  },
  selectLabel: {
    color: "black",
  },
  search: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function BookList() {
  const styles = useStyles();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [lastPage, setLastPage] = useState(1);
  const books = useAppSelector(selectFilteredBooks);

  useEffect(() => {
    setLastPage(Math.ceil(books.length / pageSize));
  });

  const pageChanger = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const resetPage = () => {
    setPage(1);
  }

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

  return (
    <div className={styles.root}>
      <div className={styles.search}>
              <SearchOptions resetPage={resetPage}></SearchOptions>

      </div>
      <div>
        {booksToDisplay.map((book, index) => {
          return (
            <BookCard
              key={index}
              book={book}
            />
          );
        })}
      </div>
      <div className={styles.pager}>
        <div>
          <Typography>
            {books.length < 1
              ? "No results found"
              : "Page: " +
                page +
                " - Showing Results " +
                resultStart +
                " to " +
                resultStop +
                " of " +
                books.length}
          </Typography>
          <Pagination count={lastPage} page={page} onChange={pageChanger} />
        </div>
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
        </div>
      </div>
            <BookInfoResponse></BookInfoResponse>
    </div>
  );
}

export default BookList;
