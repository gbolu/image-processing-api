import joi from 'joi'

export const ProcessAndFetchImageSchema = joi.object().keys({
  height: joi.number().required(),
  width: joi.number().required(),
  fileName: joi.string().required(),
  outputFormat: joi.string().valid('jpeg', 'png', 'webp')
})

export const FetchImageSchema = joi.object().keys({
  filename: joi.string().regex(/^.*\.(jpg|JPG|png|webp|jpeg)$/)
})
