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
  public start_latitude: number

  @column()
  public start_longitude: number

  @column()
  public destination_latitude: number

  @column()
  public destination_longitude: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
