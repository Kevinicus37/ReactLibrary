import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Book from "../../types/Book";
import { BookInfo } from "../../types/BookInfo";
import Card from "../../types/Card";

export interface BookState {
  books: Array<any>;
  status: "idle" | "loading" | "failed";
  bookToAdd: Book;
  addBookResponse: boolean;
  filteredBooks: Array<Book>;
  availableBooks: Array<Book>;
  searchedBooks: Array<Book>;
  patronBooks: Array<Book>;
  query: string;
  searchType: string;
  recentlyDeletedBooks: Array<Book>;
  bookToActOn: Book;
  bookToRestore: Book;
  isConfirmationOpen: boolean;
  bookInfoResponseIsOpen: boolean;
  cardNumberEntryIsOpen: boolean;
  checkInResponseIsOpen: boolean;
  deletedPath: string;
  checkoutResponseOpen: boolean;
  checkedoutBook: any;
  dueDate: any;
  bookInfo: BookInfo;
}

const axios = require('axios').default;

const initialState: BookState = {
  books: [],
  status: "idle",
  bookToAdd: { bookId: 0, title: "", authors: [], publishedYear: 0, isbn: "", isOverdue: false},
  addBookResponse: true,
  filteredBooks: [],
  availableBooks: [],
  searchedBooks: [],
  patronBooks: [],
  query: "",
  searchType: "title",
  recentlyDeletedBooks: [],
  bookToActOn: { bookId: 0, title: "", authors: [], publishedYear: 0, isbn: "", isOverdue: false},
  bookToRestore: { bookId: 0, title: "", authors: [], publishedYear: 0, isbn: "", isOverdue: false},
  isConfirmationOpen: false,
  cardNumberEntryIsOpen: false,
  bookInfoResponseIsOpen: false,
  deletedPath: "/deleted",
  checkoutResponseOpen: false,
  checkInResponseIsOpen: false,
  checkedoutBook: { bookId: 0, Title: "", Authors: [], PublishedYear: 0, ISBN: ""},
  dueDate: "",
  bookInfo: {checkedOutInfo : {name: "", address: "", phoneNumber: "", email: "", cardNumber: ""}, dueDate: "", checkedOutDate: ""}
};

export const fetchBooksAsync = createAsyncThunk(
  "book/fetchBooksAsync",
  async () => {
    const response = await fetch("https://localhost:44371/api/Book");
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const fetchAvailableBooksAsync = createAsyncThunk(
  "book/fetchAvailableBooksAsync",
  async () => {
    const response = await fetch("https://localhost:44371/api/Book/Book/available");
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);


export const fetchPatronBooksAsync = createAsyncThunk(
  "book/fetchPatronBooksAsync",
  async (cardNumber : string) => {
    const response = await fetch("https://localhost:44371/api/Book/Book/CheckedOut?cardNumber=" + cardNumber);
      
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const fetchBookInfoAsync = createAsyncThunk(
  "book/fetchBookInfoAsync",
  async (id : number) => {
    const response = await fetch("https://localhost:44371/api/Book/Info/" + id);
      
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const checkoutBook = createAsyncThunk(
  "book/checkout",
  async (checkoutData: any) => {
    const response = await fetch("https://localhost:44371/api/Book/Book/CheckOut", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(checkoutData),
    });
    const data = await response.json();
    if (!response.ok) {
      return data.then(Promise.reject.bind(Promise));
    }
    return data;
  }
);

export const checkInBook = createAsyncThunk(
  "book/checkin",
  async (id: number) => {
    const response = await axios.put("https:localhost:44371/api/Book/Book/CheckIn/", { bookId: id });
    
    return id;
  }
);

export const deleteBookAsync = createAsyncThunk("book/deleteBookAsync", async (book : Book) => {
const response = await fetch("https://localhost:44371/api/Book/" + book.bookId, {
  method: "DELETE",
  headers: { "Content-type" : "application/json" },
});
  return {bookId: book.bookId, title: book.title, authors: book.authors, publishedYear: book.publishedYear, isbn: book.isbn, isOverdue: book.isOverdue };
});

export const postBookAsync = createAsyncThunk(
  "book/postBookAsync",
  async (book: Book) => {
    const response = await fetch("https://localhost:44371/api/Book", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    if (!response.ok) {
      return data.then(Promise.reject.bind(Promise));
    }

    return data;
  }
);

export const addPatronAsync = createAsyncThunk(
  "cards/addPatronAsync",
  async (card: Card) => {
    console.log(card);
    const response = await fetch("https://localhost:44371/api/Patron", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(card),
    });
    return response.json();
  }
);

export const searchBooksAsync = createAsyncThunk(
  "book/searchBooksAsync",
  async (query: string) => {
    return;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setFilteredBooks: (state, action: PayloadAction<Array<any>>) => {
      state.filteredBooks = action.payload;
    },
    setBookToActOn: (state, action: PayloadAction<Book>) => {
      state.bookToActOn = action.payload;
    },
    setConfirmationOpen:(state, action: PayloadAction<boolean>) => {
      state.isConfirmationOpen = action.payload;
    },
    setSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCheckInResponseIsOpen: (state, action: PayloadAction<boolean>) => {
      state.checkInResponseIsOpen = action.payload;
    },
    removeFromAvailableBooks: (state, action: PayloadAction<any>) => {
      var index = state.availableBooks.findIndex(function (book) {
        return book.bookId === action.payload.bookId;
      });
      if (index != -1) {
        state.availableBooks.splice(index, 1);
      }
    },
    addToAvailableBooks: (state, action:PayloadAction<Book>) => {
      state.availableBooks.push(action.payload);
    },
    addToFilteredBooks: (state, action:PayloadAction<Book>) => {
      state.filteredBooks.push(action.payload);
    },
    removeFromFilteredBooks: (state, action: PayloadAction<any>) => {
      var index = state.filteredBooks.findIndex(function (book) {
        return book.bookId === action.payload.bookId;
      });
      if (index != -1) {
        state.filteredBooks.splice(index, 1);
      }
    },
    setCheckoutResponseOpen: (state, action: PayloadAction<boolean>) => {
      state.checkoutResponseOpen = action.payload;
    },
    setCheckedoutBook: (state, action: PayloadAction<any>) => {
      state.checkedoutBook = action.payload;
    },
    setCardNumberEntryIsOpen: (state, action: PayloadAction<boolean>) => {
      state.cardNumberEntryIsOpen = action.payload;
    },
    setDueDate: (state, action: PayloadAction<any>) => {
      state.dueDate = action.payload;
    },
    clearPatronBooks: (state, action: PayloadAction<any>) => {
      state.patronBooks = [];
    },
    setBookInfoResponseIsOpen: (state, action:PayloadAction<boolean>) => {
      state.bookInfoResponseIsOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.books = action.payload.books;
        state.status = "idle";
        //state.filteredBooks = action.payload.books;
      })
      .addCase(fetchBooksAsync.rejected, (state) => {
        state.status="failed";
      })
      .addCase(fetchAvailableBooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAvailableBooksAsync.fulfilled, (state, action) => {
        state.availableBooks = action.payload.books;
        state.status = "idle";
        state.filteredBooks = action.payload.books;
      })
      .addCase(fetchAvailableBooksAsync.rejected, (state) => {
        state.status="failed";
      })
      .addCase(postBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBookAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addBookResponse = true;
        state.books.push(action.payload.addedBook);
        state.availableBooks.push(action.payload.addedBook);
        state.filteredBooks.push(action.payload.addedBook);
        if (window.location.pathname == "/deleted"){
          let index = state.recentlyDeletedBooks.findIndex(function (book) { return book.bookId === state.bookToActOn.bookId});
          if (index != -1) state.recentlyDeletedBooks.splice(index,1);
        }
      })
      .addCase(postBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.addBookResponse = false;
      })
      .addCase(deleteBookAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.recentlyDeletedBooks.push(action.payload);
        let index = state.books.findIndex(function (book) { return book.bookId === action.payload.bookId});
        if (index != -1) state.books.splice(index, 1);
        let index2 = state.filteredBooks.findIndex(function (book) { return book.bookId === action.payload.bookId});
        if (index2 != -1) state.filteredBooks.splice(index2,1);
        let index3 = state.availableBooks.findIndex(function (book) { return book.bookId === action.payload.bookId});
        if (index3 != -1) state.availableBooks.splice(index3,1);
      })
      .addCase(addPatronAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPatronAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(checkoutBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutBook.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(checkoutBook.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkInBook.pending, (state) => {
        state.status="loading";
      })
      .addCase(checkInBook.fulfilled, (state, action) => {
        state.status="idle";
        let book = state.books.find(function (book) { return book.bookId == action.payload});
        book.isOverdue = false;

        let filteredBook = state.filteredBooks.find(function (book) { return book.bookId == action.payload});
        if (filteredBook == null) {
          state.filteredBooks.push(book);
        }
        else{
          filteredBook.isOverdue = false;
        }

        let index = state.patronBooks.findIndex(function (book) { return book.bookId == action.payload});
        if (index != -1) state.patronBooks.splice(index,1);

        state.availableBooks.push(book);
        
      })
      .addCase(checkInBook.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchPatronBooksAsync.pending, (state) => {
        state.status="loading";
      })
      .addCase(fetchPatronBooksAsync.fulfilled, (state, action) => {
        state.status="idle";
        state.patronBooks = action.payload.books;
      })
      .addCase(fetchBookInfoAsync.pending, (state) => {
        state.status="loading";
      })
      .addCase(fetchBookInfoAsync.fulfilled, (state, action) => {
        state.status="idle";
        state.bookInfo = action.payload;
      });

  },
});

export const selectBooks = (state: RootState) => state.book.books;
export const selectAddBookResponse = (state: RootState) =>
  state.book.addBookResponse;
export const selectSearchedBooks = (state: RootState) => state.book.searchedBooks;
export const selectFilteredBooks = (state: RootState) => state.book.filteredBooks;
export const selectSearchType = (state: RootState) => state.book.searchType;
export const selectQuery = (state: RootState) => state.book.query;
export const selectRecentlyDeleted = (state: RootState) => state.book.recentlyDeletedBooks;
export const selectBookToActOn = (state: RootState) => state.book.bookToActOn;
export const selectConfirmationOpen = (state: RootState) => state.book.isConfirmationOpen;
export const selectDeletedPath = (state: RootState) => state.book.deletedPath;
export const selectAvailableBooks = (state: RootState) => state.book.availableBooks;
export const selectCheckoutResponseOpen = (state: RootState) =>
  state.book.checkoutResponseOpen;
export const selectCheckInResponseIsOpen = (state: RootState) =>
  state.book.checkInResponseIsOpen;
  export const selectBookInfoResponseIsOpen = (state: RootState) =>
  state.book.bookInfoResponseIsOpen;
export const selectCheckoutedBook = (state: RootState) =>
  state.book.checkedoutBook;
export const selectCardNumberEntryIsOpen = (state: RootState) => state.book.cardNumberEntryIsOpen;
export const selectDueDate = (state: RootState) => state.book.dueDate;
export const selectPatronBooks = (state: RootState) => state.book.patronBooks;
export const selectStatus = (state: RootState) => state.book.status;
export const selectBookInfo = (state: RootState) => state.book.bookInfo;

export const {setFilteredBooks, setBookToActOn, setConfirmationOpen, removeFromAvailableBooks, addToFilteredBooks, setBookInfoResponseIsOpen, setQuery, addToAvailableBooks, setCheckInResponseIsOpen, clearPatronBooks, removeFromFilteredBooks, setCheckedoutBook, setCardNumberEntryIsOpen, setCheckoutResponseOpen, setDueDate, setSearchType} = bookSlice.actions;

export default bookSlice.reducer;
