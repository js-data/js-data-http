import {Adapter} from 'js-data-adapter'

interface IDict {
  [key: string]: any;
}
interface IActionOpts {
  adapter?: string,
  pathname?: string,
  request?: Function,
  response?: Function,
  responseError?: Function
}
interface IBaseAdapter extends IDict {
  debug?: boolean,
  raw?: boolean
}
interface IBaseHttpAdapter extends IBaseAdapter {
  basePath?: string
  forceTrailingSlash?: boolean
  http?: any
  httpConfig?: IDict
  suffix?: string
  useFetch?: boolean
}
export function addAction(name: string, opts: IActionOpts): Function
export function addActions(opts ?: { [key:string]: IActionOpts }): Function
export class HttpAdapter extends Adapter {
  static version: {
    full?: string
    minor?: string
    major?: string
    patch?: string
    alpha?: string | boolean
    beta?: string | boolean
  }
  static extend(instanceProps?: IDict, classProps?: IDict): typeof HttpAdapter
  constructor(opts?: IBaseHttpAdapter)
}
