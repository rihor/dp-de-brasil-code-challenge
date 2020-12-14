import Delivery from 'App/Models/Delivery'
import { DateTime } from 'luxon'

interface CreateDelivery {
  client_name: string
  date: DateTime
  start: string
  destination: string
}

export class DeliveryService {
  public async getDeliveries() {
    const deliveries = await Delivery.all()

    return deliveries
  }

  public async createDelivery({
    client_name,
    date,
    start,
    destination,
  }: CreateDelivery) {
    const delivery = await Delivery.create({
      client_name,
      date,
      start,
      destination,
    })

    await delivery.save()

    return delivery
  }
}
