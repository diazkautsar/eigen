import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BookController } from "./book.controllers";
import { BookService } from "./book.service";
import { bookProvider } from "./book.providers";
import { Helpers } from "../helpers";

@Module({
  imports: [ DatabaseModule ],
  controllers: [ BookController ],
  providers: [
    BookService,
    ...bookProvider,
    Helpers,
  ]
})
export class BookModule {}