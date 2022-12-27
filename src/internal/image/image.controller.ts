import ImageService from './image.service'
import { Response, Request } from 'express'
import { ProcessImageDTO } from './image.dto'
import Controller from '../common/controller'
import { AppError } from '../../util/appError'
import errorResponse from '../../util/responseHandlers/errorResponse'
import { ERROR_MESSAGES } from '../../util/responseMessages'
import ErrorCodes from '../../util/errorCodes'
import successResponse from '../../util/responseHandlers/successResponse'
import fileDownloadResponse from '../../util/responseHandlers/fileDownloadResponse'
import path from 'path'

export default class ImageController extends Controller {
  ImageService: ImageService
  constructor() {
    super()
    this.ImageService = new ImageService()
  }

  public processAndFetchImage = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { height, width, fileName, outputFormat } =
        request.body as unknown as ProcessImageDTO

      const transformationProps = {
        dimensions: {
          height: parseInt(height, 10),
          width: parseInt(width, 10)
        },
        fileName,
        outputFormat
      }

      // Check for image transformation in cache
      const cachedTransformedImagePath =
        ImageService.computeImageTransformationCachePath(transformationProps)

      if (this.ImageService.fileExistsInCache(cachedTransformedImagePath)) {
        return fileDownloadResponse(
          path.resolve(
            ImageService.getTransformationCachePath(),
            cachedTransformedImagePath
          ),
          200,
          response
        )
      }

      // Check if file exists in image store
      if (!this.ImageService.fileExistsInImageStore(fileName)) {
        return errorResponse(
          new AppError(
            'File does not exist in image store',
            404,
            ErrorCodes.INVALID_FILE_NAME
          ),
          response
        )
      }
      // Perform image transformation
      const { outputLocation } = await this.ImageService.transformImage(
        transformationProps
      )

      return fileDownloadResponse(outputLocation, 200, response)
    } catch (error) {
      this.classLogger.error(error)
      return errorResponse(
        new AppError(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          500,
          ErrorCodes.INTERNAL_SERVER_ERROR
        ),
        response
      )
    }
  }

  public fetchImageList = async (req: Request, res: Response) => {
    const files = await this.ImageService.fetchImageList()

    return successResponse(files, 'Files retrieved successfully', 200, res)
  }
}
