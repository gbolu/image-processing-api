import {
  TransformImageProps,
  TransformImageResponse
} from '../common/types/manipulation.types'

import { AppError } from '../../util/appError'
import { Logger } from 'winston'
import logger from '../../util/logger'
import fs from 'fs'
import sharp from 'sharp'
import ErrorCodes from '../../util/errorCodes'
import { ERROR_MESSAGES } from '../../util/responseMessages'
import path from 'path'
import { readdir } from 'fs/promises'

export default class ImageService {
  public classLogger: Logger
  constructor() {
    this.classLogger = logger.child({ context: this.constructor.name })
    this.createImageTransformationStoreIfNotExists()
  }

  private doesPathExist(path: string) {
    return fs.existsSync(path)
  }

  public static getImageStorePath() {
    return path.resolve(__dirname, '../../assets/images')
  }

  public static getTransformationCachePath(): string {
    const imageStoreDirectoryPath = ImageService.getImageStorePath()
    const transformationCachePath = path.resolve(
      imageStoreDirectoryPath,
      '../transformations'
    )

    return transformationCachePath
  }

  public fileExistsInCache(fileName: string): boolean {
    const transformationCache = ImageService.getTransformationCachePath()

    return this.doesPathExist(path.resolve(transformationCache, fileName))
  }

  public fileExistsInImageStore(fileName: string): boolean {
    const imageStore = ImageService.getImageStorePath()

    return this.doesPathExist(path.resolve(imageStore, fileName))
  }

  private createImageTransformationStoreIfNotExists() {
    const transformationCachePath = ImageService.getTransformationCachePath()

    if (!fs.existsSync(transformationCachePath)) {
      fs.mkdir(transformationCachePath, () => {
        logger.info(
          `Image transformation cache directory created at: ${transformationCachePath}`
        )
      })
    }
  }

  public static computeImageTransformationCachePath(
    props: TransformImageProps
  ) {
    const { fileName, dimensions, outputFormat = 'jpeg' } = props

    const { height, width } = dimensions

    return `${fileName}_h_${height}_w_${width}.${outputFormat}`
  }

  public async fetchImageList(): Promise<string[]> {
    return await readdir(ImageService.getImageStorePath())
  }

  public async fetchTransformationCacheList(): Promise<string[]> {
    return await readdir(ImageService.getTransformationCachePath())
  }

  public async transformImage(
    props: TransformImageProps
  ): Promise<TransformImageResponse> {
    try {
      const { dimensions, fileName, outputFormat } = props

      const { width, height } = dimensions

      const fileLocation = path.resolve(
        ImageService.getImageStorePath(),
        fileName
      )

      let resizeOperation = sharp(fileLocation).resize(width, height)

      if (!fileName || fileName === '') {
        throw new AppError(
          'Please provide filename.',
          400,
          ErrorCodes.INVALID_FILE_NAME
        )
      }

      const outputLocation = path.resolve(
        ImageService.getTransformationCachePath(),
        ImageService.computeImageTransformationCachePath(props)
      )

      switch (outputFormat) {
        case 'png':
          resizeOperation = resizeOperation.png()
          break
        case 'jpg' || 'jpeg':
          resizeOperation = resizeOperation.jpeg()
          break
        case 'webp':
          resizeOperation = resizeOperation.webp()
          break
        default:
          resizeOperation = resizeOperation.jpeg()
          break
      }

      await resizeOperation.toFile(outputLocation)
      return {
        outputLocation
      }
    } catch (error) {
      logger.error(
        `Error occurred while performing image resize operation: ${error}`
      )
      throw new Error(ERROR_MESSAGES.IMAGE_PROCESSING_ERROR)
    }
  }
}
