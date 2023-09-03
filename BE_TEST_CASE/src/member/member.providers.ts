import { Provider } from "@nestjs/common";
import { MEMBER_REPOSITORY } from "../constants";
import { Member } from "./member.entity";

export const memberProvider: Provider[] = [
  {
    provide: MEMBER_REPOSITORY,
    useValue: Member
  }
]