import { Table, Model, Column, Unique, NotNull, AllowNull } from "sequelize-typescript";

@Table({ tableName: 'book_members', freezeTableName: true })
export class BookMember extends Model {
  @AllowNull(false)
  @Column
  book_id: number

  @AllowNull(false)
  @Column
  member_id: number

  @AllowNull(false)
  @Column
  returned_date: Date

  @AllowNull(false)
  @Column
  is_returned: boolean
}