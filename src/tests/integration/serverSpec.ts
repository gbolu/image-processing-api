/* eslint-disable no-undef */
import supertest from 'supertest'
import { URLSearchParams } from 'url'
import app from '../../app'
import { ErrorResponseObject } from '../../internal/common/types/response.types'
import ErrorCodes from '../../util/errorCodes'

const request = supertest(app)
describe('Test server error responses', () => {
  it('Returns a 404 endpoint response to an invalid enpoint', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(404)
  })

  it('Returns a 400 response for failed validations', async () => {
    const response = await request.get('/images/single')

    const responseBody = response.body as ErrorResponseObject
    const { errorCode, message, status, statusCode } = responseBody

    expect(statusCode).toBe(400)
    expect(status).toBe(false)
    expect(message).toContain('height')
    expect(errorCode).toEqual(ErrorCodes.VALIDATION_ERROR)
  })

  it('Returns a 404 response for invalid/non-existent filename', async () => {
    const queryParams = new URLSearchParams('')

    queryParams.append('height', '100')
    queryParams.append('width', '100')
    queryParams.append('fileName', 'test.jpg')
    queryParams.append('outputFormat', 'png')

    const response = await request.get(
      `/images/single?${queryParams.toString()}`
    )

    const responseBody = response.body as ErrorResponseObject
    const { errorCode, status, statusCode } = responseBody

    expect(statusCode).toBe(404)
    expect(status).toBe(false)
    expect(errorCode).toEqual(ErrorCodes.INVALID_FILE_NAME)
  })
})
