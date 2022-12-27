/* eslint-disable no-undef */
import supertest from 'supertest'
import { URLSearchParams } from 'url'
import app from '../../app'
import ImageService from '../../internal/image/image.service'

const request = supertest(app)

describe('Test Image Process endpoint - /images/single', () => {
  it('Returns a 200 endpoint response to a process an enpoint', async () => {
    const queryParams = new URLSearchParams('')

    queryParams.append('height', '100')
    queryParams.append('width', '100')
    queryParams.append('fileName', 'fjord.jpg')
    queryParams.append('outputFormat', 'png')

    let data = ''

    const response = await request
      .get(`/images/single?${queryParams.toString()}`)
      .buffer()
      .parse((res, callback) => {
        res.setEncoding('binary')

        res.on('data', (chunk: Buffer) => {
          data += chunk
        })

        res.on('end', () => {
          callback(null, Buffer.from(data, 'binary'))
        })
      })

    const path = ImageService.computeImageTransformationCachePath({
      dimensions: { height: 100, width: 100 },
      fileName: 'fjord.jpg',
      outputFormat: 'png'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('image/png')
    expect(response.headers['content-disposition']).toBe(
      `attachment; filename="${path}"`
    )
    expect(response.headers['content-length']).toBeGreaterThan(0)
  })
})
