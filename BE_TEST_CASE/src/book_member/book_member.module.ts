import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BookMemberController } from "./book_member.controllers";
import { BookMemberService } from "./book_member.service";
import { bookProvider } from "src/book/book.providers";
import { memberProvider } from "src/member/member.providers";
import { bookMemberProvider } from "./book_member.providers";
import { Helpers } from "src/helpers";

@Module({
  imports: [ DatabaseModule ],
  controllers: [ BookMemberController ],
  providers: [
    BookMemberService,
    ...bookProvider,
    ...memberProvider,
    ...bookMemberProvider,
    Helpers,
  ]
})
export class BookMemberModule {}