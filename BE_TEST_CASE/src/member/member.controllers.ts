import { Body, Controller, Get, HttpCode, Inject, Post, Res } from "@nestjs/common";
import { Helpers } from "../helpers";
import { Response } from "express";
import { MemberService } from "./member.service";
import { CreateMemberDto } from "./member.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('MEMBER')
@Controller('member')
export class MemberController {
  constructor(
    @Inject(Helpers) private readonly helpers: Helpers,
    @Inject(MemberService) readonly memberService: MemberService
  ) {}

  @Get('')
  @ApiOperation({ summary: 'get all member' })
  @HttpCode(200)
  async getMember(
    @Res() res: Response
  ) {
    try {
      const data = await this.memberService.findAll()

      this.helpers.response({
        res,
        data,
        success: true,
        statusCode: 200,
        message: 'success get member'
      })
    } catch (error) {
      throw error
    }
  }

  @Post('')
  @ApiOperation({ summary: 'create member' })
  @HttpCode(201)
  async createMember(@Res() res: Response, @Body() body: CreateMemberDto) {
    try {
      const data = await this.memberService.createMember(body)

      this.helpers.response({ 
        success: true,
        message: 'success create member',
        statusCode: 200,
        res,
        data
      })
    } catch (error) {
      throw error
    }
  }
}