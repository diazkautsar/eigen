import { Body, Controller, HttpCode, Inject, Post, Put, Res } from "@nestjs/common";
import { Helpers } from "../helpers";
import { BookMemberService } from "./book_member.service";
import { Response } from "express";
import { BorrowBookDto, ReturnedBookDto } from "./book_member.dto";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('BOOK MEMBER')
@Controller('book-member')
export class BookMemberController {
  constructor(
    @Inject(Helpers) private readonly helpers: Helpers,
    @Inject(BookMemberService) readonly bookMemberService: BookMemberService,
  ) {}

  @Post('/borrow')
  @ApiOperation({ summary: "borrow book" })
  @HttpCode(201)
  async borrowBook(
    @Res() res: Response,
    @Body() body: BorrowBookDto
  ) {
    try {
      const data = await this.bookMemberService.borrowBook(body)

      this.helpers.response({
        success: true,
        statusCode: 201,
        message: 'success borrow book',
        res,
        data
      })
    } catch (error) {
      throw error
    }
  }

  @Put('/returned')
  @ApiOperation({ summary: "returned book" })
  @HttpCode(201)
  async returnedBook(
    @Res() res: Response,
    @Body() body: ReturnedBookDto
  ) {
    try {
      const data = await this.bookMemberService.returnedBook(body)

      this.helpers.response({
        res,
        statusCode: 201,
        success: true,
        message: "success returned book",
        data,
      })
    } catch (error) {
      throw error
    }
  }
}