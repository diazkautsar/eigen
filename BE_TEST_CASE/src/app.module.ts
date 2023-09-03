import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.config'
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { BookMemberModule } from './book_member/book_member.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    MemberModule,
    BookModule,
    BookMemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
