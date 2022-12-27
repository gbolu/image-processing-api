export type Dimensions = {
  height: number
  width: number
}

export type TransformImageProps = {
  dimensions: Dimensions
  fileName: string
  outputFormat?: string
}

export type TransformImageResponse = {
  outputLocation: string
}
