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
      start: 'Rio de Janeiro',
      destination: 'São Paulo',
    })
    assert.equal(status, 200)
    assert.hasAllKeys(body, [
      'id',
      'client_name',
      'date',
      'start',
      'destination',
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
      'start',
      'destination',
      'created_at',
      'updated_at',
    ])
  })

  test('if delivery fails validation', async (assert) => {
    const { status, body } = await supertest(baseUrl).post('/deliveries').send({
      date: new Date().toISOString(),
      start: 'Rio de Janeiro',
      destination: 'São Paulo',
    })
    assert.equal(status, 400)
    assert.deepEqual(body, {
      errors: [
        {
          rule: 'required',
          field: 'client_name',
          message: 'required validation failed',
        },
      ],
    })
  })
})
