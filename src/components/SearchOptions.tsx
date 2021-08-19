import {
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  NativeSelect,
  Select,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAvailableBooks, selectBooks, selectFilteredBooks, selectQuery, selectSearchType, setFilteredBooks, setQuery, setSearchType } from "../features/books/bookSlice";
import SearchBox from "./SearchBox";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) => createStyles({
  selectLabel: {
    color: "black",
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchComponent: {
    marginLeft: 30,
  },
  searchBy: {
    marginTop: 20,
  },
  Icon: {
    marginTop: 10,
    marginLeft: 30,
  },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

type SearchOptionProps = {
  resetPage : Function,
}

export default function SearchOptions({resetPage} : SearchOptionProps) {
    const styles = useStyles();
    const [available, setAvailable] = useState(true);
    const [overdue, setOverdue] = useState(false);
    const allBooks = useAppSelector(selectBooks);
    const availableBooks =useAppSelector(selectAvailableBooks);
    const dispatch = useAppDispatch();
    let booksToFilter = availableBooks;
    let tempBooks = availableBooks;
    const searchType = useAppSelector(selectSearchType);
    const query = useAppSelector(selectQuery);
    
    

useEffect(() => {
    dispatch(setFilteredBooks(availableBooks));
  }, []);

const handleSearchTypeChange = (
    event: React.ChangeEvent<{ value: any }>
    ) => {
      let filter = event.target.value;
      dispatch(setSearchType(filter));
    
  };


  const processSearch = (event: any) => {
    booksToFilter = available ? availableBooks : allBooks;
    event.preventDefault();
    dispatch(setFilteredBooks(
      booksToFilter.filter((book :any) =>
        book[searchType]
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase()) && (book.isOverdue == overdue || !overdue)))
      );
      resetPage();   
  };

  const handleAvailableCheckBoxChange = (
    event: React.ChangeEvent<{}>,
    checked: boolean) => {
      setAvailable(checked);
      filterBooks(checked);
      dispatch(setFilteredBooks(tempBooks));
      if (checked) setOverdue(!checked);
  };

  const handleOverdueCheckBoxChange = (
    event: React.ChangeEvent<{}>,
    checked: boolean) => {
      setOverdue(checked);
      dispatch(setFilteredBooks(allBooks.filter((book) => book[searchType].toString().toLowerCase().includes(query.toLowerCase()) && (book.isOverdue == checked || !checked))));
      if (checked) setAvailable(!checked);
};

  const filterBooks = (checked : boolean) => {
    booksToFilter = checked? availableBooks : allBooks;
    tempBooks = booksToFilter.filter((book : any) => 
      book[searchType]
      .toString()
      .toLowerCase()
      .includes(query.toLowerCase()));
  };

    return (<form className={styles.search} onSubmit={processSearch}>
        <div className={styles.searchBy}>
          <InputLabel className={styles.selectLabel} id="pageSizeLabel">
            Search By...
          </InputLabel>
          <Select
            id="SearchBy"
            inputProps={{ "aria-label": "Search By..." }}
            value={searchType}
            onChange={handleSearchTypeChange}
            className={styles.formControl}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"authors"}>Author</MenuItem>
            <MenuItem value={"isbn"}>ISBN</MenuItem>
            <MenuItem value={"publishedYear"}>Year</MenuItem>
          </Select>
        </div>
        <div className={styles.searchComponent}>
          <SearchBox ></SearchBox>
        </div>
        <div>
          <IconButton
              className={styles.Icon}
              aria-label="addAuthor"
              color="primary"
              onClick={processSearch}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
        </div>
        <div className={(styles.searchComponent, styles.searchBy)}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                control={<Checkbox defaultChecked checked={available} color="primary" />}
                label="Available"
                labelPlacement="start"
                onChange={handleAvailableCheckBoxChange}
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className={(styles.searchComponent, styles.searchBy)}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                control={<Checkbox checked={overdue} color="primary" />}
                label="Overdue"
                labelPlacement="start"
                onChange={handleOverdueCheckBoxChange}
              />
            </FormGroup>
          </FormControl>
        </div>
        
      </form>)
}