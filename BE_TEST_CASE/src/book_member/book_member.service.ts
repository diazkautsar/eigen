import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Book } from "../book/book.entity";
import { BOOK_MEMBER_REPOSITORY, BOOK_REPOSITORY, MEMBER_REPOSITORY, SEQUELIZE } from "../constants";
import { Member } from "../member/member.entity";
import { BookMember } from "./book_member.entity";
import { BorrowBookDto, ReturnedBookDto } from "./book_member.dto";
import * as dayjs from 'dayjs'
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class BookMemberService {
  constructor(
    @Inject(BOOK_REPOSITORY) private bookRepository: typeof Book,
    @Inject(MEMBER_REPOSITORY) private memberRepository: typeof Member,
    @Inject(BOOK_MEMBER_REPOSITORY) private bookMemberRepository: typeof BookMember,
    @Inject(SEQUELIZE) private db: Sequelize
  ) {}

  async borrowBook (payload: BorrowBookDto) {
    const transaction = await this.db.transaction()
    try {
      const { book_code, member_code, date } = payload

      // check avail book
      const book = await this.bookRepository.findOne({ where: { code: book_code } })
      if (!book) throw new BadRequestException(`Book not found`)

      // check avail member
      const member = await this.memberRepository.findOne({ where: { code: member_code } })
      if (!member) throw new BadRequestException(`Member not found`)

      if ((member && member.penalty) && ( dayjs(date).isBefore(dayjs(member.penalty_end_date)) || dayjs(date).isSame(dayjs(member.penalty_end_date)) )) {
        throw new BadRequestException(`Member under status penalty. cannot borrow book`)
      }

      // check stock of book
      if (typeof book.stock === 'number' && book.stock <= 0) {
        throw new BadRequestException(`Book stock empty`)
      }

      // check only one time member borrow book
      const alreadyBorrowed = await this.bookMemberRepository.findOne({ where: { member_id: member.id, is_returned: false } })
      if (alreadyBorrowed) throw new BadRequestException(`Cant borrow book. Please returned the previous book`)

      const data = {
        book_id: book.id,
        member_id: member.id,
        returned_date: dayjs(date).add(7, "day").format('YYYY-MM-DD'),
        is_returned: false
      }

      book.stock = book.stock - 1
      member.penalty = false
      member.penalty_end_date = null
      await this.bookMemberRepository.create(data, { transaction })
      await book.save({ transaction })
      await member.save({ transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async returnedBook (payload: ReturnedBookDto) {
    const transaction = await this.db.transaction()
    try {
      const { book_code, member_code, date } = payload
      // check avail book
      const book = await this.bookRepository.findOne({ where: { code: book_code } })
      if (!book) throw new BadRequestException(`Book not found`)

      // check avail member
      const member = await this.memberRepository.findOne({ where: { code: member_code } })
      if (!member) throw new BadRequestException(`Member not found`)

      const bookMember = await this.bookMemberRepository.findOne({ where: {
        book_id: book.id,
        member_id: member.id,
        is_returned: false
      } })

      if (!bookMember) throw new BadRequestException(`member with this book not found`)

      bookMember.is_returned = true
      book.stock = book.stock + 1
      await book.save({ transaction })
      await bookMember.save({ transaction })

      const response: { penalty: boolean, penalty_end_date: string | null } = {
        penalty: false,
        penalty_end_date: null
      }

      if ( dayjs(date).isAfter(dayjs(bookMember.returned_date)) ) {
        member.penalty = true
        member.penalty_end_date = dayjs().add(3, "day").format("YYYY-MM-DD")

        await member.save({ transaction })

        response.penalty = true
        response.penalty_end_date = dayjs().add(3, "day").format("YYYY-MM-DD")
      }

      await transaction.commit()

      return response
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}