import Delivery from 'App/Models/Delivery'
import { DateTime } from 'luxon'

interface CreateDelivery {
  client_name: string
  date: DateTime
  start_latitude: number
  start_longitude: number
  destination_latitude: number
  destination_longitude: number
}

export class DeliveryService {
  public async getDeliveries() {
    const deliveries = await Delivery.all()

    return deliveries
  }

  public async createDelivery({
    client_name,
    date,
    start_latitude,
    start_longitude,
    destination_latitude,
    destination_longitude,
  }: CreateDelivery) {
    const delivery = await Delivery.create({
      client_name,
      date,
      start_latitude,
      start_longitude,
      destination_latitude,
      destination_longitude,
    })

    await delivery.save()

    return delivery
  }
}
