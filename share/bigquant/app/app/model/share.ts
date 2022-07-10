import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey
} from 'sequelize-typescript'

import { defOptions } from './model'

// https://github.com/sequelize/sequelize-typescript

@Table({ ...defOptions, modelName: 'share' })
export class Share extends Model<Share> {
  @PrimaryKey
  @AutoIncrement
  @Column({ comment: 'id', type: DataType.INTEGER(11) })
  id: number

  @Column({ type: DataType.STRING })
  name: string

  @Column({ type: DataType.STRING })
  code: string
}

export default () => Share
