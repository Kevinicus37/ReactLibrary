export interface Book {
  //[key: string]: string | number | string[] | boolean;
  bookId: number;
  title: string;
  authors: string[];
  publishedYear: number;
  isbn: string;
  isOverdue: boolean;
  
}

export default Book;
