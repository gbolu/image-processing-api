import { Response } from 'express'

export default function fileDownloadResponse(
  filePath: string,
  statusCode: number,
  res: Response
) {
  return res.status(statusCode).download(filePath)
}
