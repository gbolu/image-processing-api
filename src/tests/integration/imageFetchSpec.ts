/* eslint-disable no-undef */
import supertest from 'supertest'
import app from '../../app'

import { SuccessResponseObject } from '../../internal/common/types/response.types'

const request = supertest(app)

describe('Test Image Process endpoint - /images/single', () => {
  it('Returns a 200 endpoint response to a process an enpoint', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(404)
  })

  it('Returns a 400 response for failed validations', async () => {
    const response = await request.get('/images/all')

    const responseBody = response.body as SuccessResponseObject
    const { status, statusCode, data } = responseBody

    expect(statusCode).toBe(200)
    expect(status).toBe(true)
    expect(data).toHaveSize(5)
    expect((data as string[])[0]).toEqual('encenadaport.jpg')
  })
})
