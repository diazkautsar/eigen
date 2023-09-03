import { Provider } from "@nestjs/common";
import { BOOK_REPOSITORY } from "../constants";
import { Book } from "./book.entity";

export const bookProvider: Provider[] = [
  {
    provide: BOOK_REPOSITORY,
    useValue: Book
  }
]
