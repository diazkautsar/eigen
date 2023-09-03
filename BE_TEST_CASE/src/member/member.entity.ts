import { Table, Model, Column, Unique, Default, AllowNull } from "sequelize-typescript";

@Table({ tableName: 'members', freezeTableName: true })
export class Member extends Model {
  @AllowNull(false)
  @Unique
  @Column
  code: string

  @AllowNull(false)
  @Column
  name: string

  @Default(false)
  @Column
  penalty: boolean

  @Column
  penalty_end_date: string
}