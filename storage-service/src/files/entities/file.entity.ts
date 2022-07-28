import {
  Column,
  DataType,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class File extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id!: string;

  @Length({ max: 50 })
  @Column
  ownerId!: string;

  @Column(DataType.TEXT)
  url!: string;

  @Length({ max: 250 })
  @Column
  filename!: string;

  @Length({ max: 50 })
  @Column
  mimetype!: string;
}
