import { Body, Controller, Get, HttpCode, Inject, Post, Res } from "@nestjs/common";
import { Helpers } from "src/helpers";
import { BookService } from "./book.service";
import { CreateBookDto } from "./book.dto";
import { Response } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('BOOK')
@Controller('book')
export class BookController {
  constructor(
    @Inject(Helpers) private readonly helpers: Helpers,
    @Inject(BookService) readonly bookService: BookService
  ) {}

  @Post('')
  @ApiOperation({ summary: "create book" })
  @HttpCode(201)
  async createBook(@Res() res: Response, @Body() body: CreateBookDto) {
    try {
      const data = await this.bookService.createBook(body)

      this.helpers.response({
        res,
        statusCode: 201,
        success: true,
        message: "success create book",
        data,
      })
    } catch (error) {
      throw error
    }
  }

  @Get('')
  @ApiOperation({ summary: "get book" })
  @HttpCode(200)
  async getBook(@Res() res: Response) {
    try {
      const data = await this.bookService.getBook()

      this.helpers.response({ 
        res,
        statusCode: 200,
        success: true,
        message: "success get all book",
        data,
      })
    } catch (error) {
      throw error
    }
  }
}