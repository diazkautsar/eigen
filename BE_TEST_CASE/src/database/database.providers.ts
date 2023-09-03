import { Sequelize } from 'sequelize-typescript';
import { Book } from '../book/book.entity';
import { Member } from '../member/member.entity';
import { BookMember } from '../book_member/book_member.entity';
import { SEQUELIZE } from '../constants';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([ Book, Member, BookMember ]);
      await sequelize.sync();
      return sequelize;
    },
  },
]
