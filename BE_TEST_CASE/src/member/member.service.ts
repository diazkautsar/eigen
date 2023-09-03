import { Inject, Injectable } from "@nestjs/common";
import { BOOK_MEMBER_REPOSITORY, MEMBER_REPOSITORY } from "src/constants";
import { Member } from "./member.entity";
import { CreateMemberDto } from "./member.dto";
import { Helpers } from "../helpers";
import { BookMember } from "../book_member/book_member.entity";

@Injectable()
export class MemberService {
  constructor(
    @Inject(MEMBER_REPOSITORY) private memberRepository: typeof Member,
    @Inject(BOOK_MEMBER_REPOSITORY) private bookMemberRepository: typeof BookMember,
    @Inject(Helpers) readonly helpers: Helpers
  ) {}

  async findAll() {
    const data = await this.memberRepository.findAll<Member>()
    const result = await Promise.all(
      data.map(async (item) => {
        return {
          id: item.id,
          code: item.code,
          name: item.name,
          penalty: item.penalty,
          penalty_end_date: item.penalty_end_date,
          current_borrowed: await this.bookMemberRepository.findOne({ where: { member_id: item.id, is_returned: false } }),
          total_has_borrowed: await this.bookMemberRepository.count({ where: { member_id: item.id } })
        }
      })
    )
    return result
  }

  async createMember(data: CreateMemberDto) {
    try {
      const lastMember = await this.memberRepository.findOne({ order: [ ['createdAt', 'DESC' ]] })
      const code: string = lastMember ? this.helpers.createNewDataMemberCode(lastMember.code) : 'M001'
      
      const payload = {
        code,
        name: data.name
      }

      return await this.memberRepository.create(payload)
    } catch (error) {
      throw error
    }
  }
}