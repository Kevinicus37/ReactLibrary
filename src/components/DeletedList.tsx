import { useAppSelector } from "../app/hooks";
import { selectRecentlyDeleted } from "../features/books/bookSlice";
import BookCard from "./BookCard";

export default function DeletedList() {

    const books = useAppSelector(selectRecentlyDeleted);
    return <div><h1>Recently Deleted Books</h1>
        {books.length > 0? books.map((book, index) => {
          return (
            <BookCard
              key={index}
              book={book}
            />
          );
        }) : <h3>No Deleted Books found.</h3>}
      </div>;
}