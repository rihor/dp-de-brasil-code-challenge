import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DeliveryService } from 'App/Services/DeliveryService'
import DeliveryValidator from 'App/Validators/DeliveryValidator'

export default class DeliveriesController {
  public async index() {
    const deliveryService = new DeliveryService()

    const deliveries = await deliveryService.getDeliveries()

    return deliveries
  }

  public async store(ctx: HttpContextContract) {
    const data = await ctx.request.validate(DeliveryValidator)

    const deliveryService = new DeliveryService()

    const delivery = await deliveryService.createDelivery(data)

    return delivery
  }
}
