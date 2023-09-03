import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { BOOK_REPOSITORY } from "../constants";
import { Book } from "./book.entity";
import { Helpers } from "../helpers";
import { CreateBookDto } from "./book.dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_REPOSITORY) private bookRepository: typeof Book,
    @Inject(Helpers) readonly helpers: Helpers
  ) {}

  async createBook (data: CreateBookDto) {
    try {
      const { code, author, title, total_stock } = data
      const existingBook = await this.bookRepository.findOne({ where: { code } })
      if (existingBook) {
        throw new BadRequestException('code already exist')
      }

      const payload = {
        code,
        author,
        title,
        stock: total_stock,
        total: total_stock,
      }

      return await this.bookRepository.create(payload)
    } catch (error) {
      throw error
    }
  }

  async getBook () {
    try {
      return await this.bookRepository.findAll()
    } catch (error) {
      throw error
    }
  }
}