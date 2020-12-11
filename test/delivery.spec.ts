import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Deliveries', (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction()
  })

  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('if delivery can be made', async (assert) => {
    const { status, body } = await supertest(baseUrl).post('/deliveries').send({
      client_name: 'User test',
      date: new Date().toISOString(),
      start_latitude: -19.9200853,
      start_longitude: -43.9401973,
      destination_latitude: -23.3958425,
      destination_longitude: -46.3311818,
    })

    assert.equal(status, 200)
    assert.hasAllKeys(body, [
      'id',
      'client_name',
      'date',
      'start_latitude',
      'start_longitude',
      'destination_latitude',
      'destination_longitude',
      'created_at',
      'updated_at',
    ])
  }).timeout(4000)

  test('if deliveries can be listed', async (assert) => {
    const { status, body } = await supertest(baseUrl).get('/deliveries')

    const [firstDelivery] = body

    assert.equal(status, 200)
    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.hasAllKeys(firstDelivery, [
      'id',
      'client_name',
      'date',
      'start_latitude',
      'start_longitude',
      'destination_latitude',
      'destination_longitude',
      'created_at',
      'updated_at',
    ])
  })
})
