declare module JSDataHttp {
	
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
	
	interface IBaseHttpAdapter {
		basePath?: string,
		suffix?: string,
		debug?: boolean,
		forceTrailingSlash?: boolean,
		useFetch?: boolean
		http?: any,
		httpConfig?: IDict	
	}
	
	export class HttpAdapter implements IBaseHttpAdapter {

		static version: {
			full?: string,
			minor?: string,
			major?: string,
			patch?: string,
			alpha?: string | boolean,
			beta?: string | boolean
		}
		static addAction(name: string, opts: IActionOpts): Function
		static addActions(opts?: {[key:string]: IActionOpts}): Function
		static extend(instanceProps?: IDict, classProps?: IDict): HttpAdapter

		constructor(opts: IBaseHttpAdapter)
	}
}

declare module 'js-data-http' {
  export = JSDataHttp.HttpAdapter
}