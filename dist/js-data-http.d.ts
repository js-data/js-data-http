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
  afterDEL(url: string, config: any, opts: any, response: any): any
  afterGET(url: string, config: any, opts: any, response: any): any
  afterHTTP(config: any, opts: any, response: any): any
  afterPOST(url: string, data: any, config: any, opts: any, response: any): any
  afterPUT(url: string, data: any, config: any, opts: any, response: any): any
  beforeDEL(url: string, config: any, opts: any): any
  beforeGET(url: string, config: any, opts: any): any
  beforeHTTP(config: any, opts: any): any
  beforePOST(url: string, data: any, config: any, opts: any): any
  beforePUT(url: string, data: any, config: any, opts: any): any
  _count(mapper: any, query: any, opts?: any): Promise<any>
  _create(mapper: any, props: any, opts?: any): Promise<any>
  _createMany(mapper: any, props: any, opts?: any): Promise<any>
  _destroy(mapper: any, id: string | number, opts?: any): Promise<any>
  _destroyAll(mapper: any, query: any, opts?: any): Promise<any>
  _end(mapper: any, opts: any, response: any): any
  _find(mapper: any, id: string | number, opts?: any): Promise<any>
  _findAll(mapper: any, query: any, opts?: any): Promise<any>
  _sum(mapper: any, field: any, query: any, opts?: any): Promise<any>
  _update(mapper: any, id: any, props: any, opts?: any): Promise<any>
  _updateAll(mapper: any, props: any, query: any, opts?: any): Promise<any>
  _updateMany(mapper: any, records: any, opts?: any): Promise<any>
  count(mapper: any, query: any, opts?: any): Promise<any>
  create(mapper: any, props: any, opts?: any): Promise<any>
  createMany(mapper: any, props: any, opts?: any): Promise<any>
  DEL(url: string, config?: any, opts?: any): Promise<any>
  deserialize(mapper: any, response: any, opts?: any): any
  destroy(mapper: any, id: string | number, opts?: any): Promise<any>
  destroyAll(mapper: any, query: any, opts?: any): Promise<any>
  error(...args: any[]): void
  fetch(config: any, opts?: any): Promise<any>
  find(mapper: any, id: string | number, opts?: any): Promise<any>
  findAll(mapper: any, query: any, opts?: any): Promise<any>
  GET(url: string, config?: any, opts?: any): Promise<any>
  getEndpoint(mapper: any, id: string | number, opts?: any): any
  getPath(method: string, mapper: any, id: any, opts?: any): any
  getParams(opts?: any): any
  getSuffix(mapper: any, opts?: any): any
  HTTP(config: any, opts?: any): Promise<any>
  POST(url: string, data: any, config?: any, opts?: any): Promise<any>
  PUT(url: string, data: any, config?: any, opts?: any): Promise<any>
  queryTransform(mapper: any, params: any, opts?: any): any
  responseError(err: any, config?: any, opts?: any): any
  serialize(mapper: any, data: any, opts?: any): Promise<any>
  sum(mapper: any, field: any, query: any, opts?: any): Promise<any>
  update(mapper: any, id: any, props: any, opts?: any): Promise<any>
  updateAll(mapper: any, props: any, query: any, opts?: any): Promise<any>
  updateMany(mapper: any, records: any, opts?: any): Promise<any>
}
