import { Table, Model, Column, Unique, AllowNull } from "sequelize-typescript";

@Table({ tableName: 'books', freezeTableName: true, })
export class Book extends Model {
  @Unique
  @AllowNull(false)
  @Column
  code: string

  @AllowNull(false)
  @Column
  title: string

  @AllowNull(false)
  @Column
  author: string

  @AllowNull(false)
  @Column
  total: number

  @AllowNull(false)
  @Column
  stock: number
}