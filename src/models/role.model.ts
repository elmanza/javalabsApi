import { Table, Model, DataType, Column, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: 'role',
  paranoid: true,
})
export class Role extends Model {

  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT
  })
  declare id: number;

  @Column({
    type: DataType.TEXT,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;
}
