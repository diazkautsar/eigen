import { Provider } from "@nestjs/common";
import { BOOK_MEMBER_REPOSITORY } from "../constants";
import { BookMember } from "./book_member.entity";

export const bookMemberProvider: Provider[] = [
  {
    provide: BOOK_MEMBER_REPOSITORY,
    useValue: BookMember,
  }
]