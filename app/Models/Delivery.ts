import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Delivery extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public client_name: string

  @column.date()
  public date: DateTime

  @column()
  public start: string

  @column()
  public destination: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
