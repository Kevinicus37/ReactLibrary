import { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBooks, selectQuery, selectSearchType, setQuery } from "../features/books/bookSlice";

export default function SearchBox() {

  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const searchArray = useAppSelector(selectBooks);
  const searchType = useAppSelector(selectSearchType);

  
  const handleQueryChange = (event: any) => { 
    dispatch(setQuery(event.target.value));
  };

  const handleQuerySelect = (event : ChangeEvent<{}>, value : string) => {
      dispatch(setQuery(value));
  }

// Get unique values for the Autocomplete array.
let options :string [] = [];
if (searchType == "authors"){
  for (let book of searchArray){
    let authors = book.authors;
    for (let author of authors){
      options.push(author);
    }
  }
}
else {
  options = searchArray.map((option : any) => option[searchType].toString());
}

let unique = Array.from(new Set(options));
        
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id=""
        freeSolo
        options={unique}
        onInputChange={handleQuerySelect}
        renderInput={(params) => (
          <TextField
            {...params}
            id="searchField"
            label="Search"
            margin="normal"
            variant="outlined"
            value={query}
            onChange={handleQueryChange}
          />
        )}
      />
    </div>
  );
}
 