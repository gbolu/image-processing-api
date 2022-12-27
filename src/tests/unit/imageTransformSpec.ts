import ImageService from '../../internal/image/image.service'

/* eslint-disable no-undef */

describe('Tests image processing/transforming', async () => {
  const imageService = new ImageService()
  it('creates a copy of the image in the transformation cache', async () => {
    const props = {
      dimensions: { height: 100, width: 100 },
      fileName: 'fjord.jpg',
      outputFormat: 'png'
    }

    await imageService.transformImage(props)

    const transformedImages = await imageService.fetchTransformationCacheList()
    expect(transformedImages).toHaveSize(1)
  })
})
