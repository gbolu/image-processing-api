import { Logger } from 'winston'

import logger from '../../util/logger'

export default class Controller {
  public classLogger: Logger
  constructor() {
    this.classLogger = logger.child({ context: this.constructor.name })
  }
}
