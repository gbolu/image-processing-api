import { Router } from 'express'
import ImageController from './image.controller'
import {
  validateRequest,
  VALIDATION_TYPE
} from '../../util/middlewares/validation'
import { ProcessAndFetchImageSchema } from './image.schema'
const imageRouter = Router()

const imageController = new ImageController()

imageRouter.get(
  '/single',
  validateRequest(ProcessAndFetchImageSchema, VALIDATION_TYPE.QUERY),
  imageController.processAndFetchImage
)

imageRouter.get('/all', imageController.fetchImageList)

export default imageRouter
