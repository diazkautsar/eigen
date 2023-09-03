import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { MemberController } from "./member.controllers";
import { MemberService } from "./member.service";
import { memberProvider } from "./member.providers";
import { Helpers } from "../helpers";
import { bookMemberProvider } from "src/book_member/book_member.providers";

@Module({
  imports: [ DatabaseModule ],
  controllers: [ MemberController ],
  providers: [
    MemberService,
    ...memberProvider,
    ...bookMemberProvider,
    Helpers,
  ]
})
export class MemberModule {}