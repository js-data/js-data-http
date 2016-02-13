##### 3.0.0-alpha.4 - 12 February 2016

###### Backwards compatible API changes
- Better debugging/logging
- Updates for the newest js-data alpha

##### 3.0.0-alpha.3 - 10 January 2016

###### Backwards compatible API changes
- Added updateMany, createMany, and responseError methods.

##### 3.0.0-alpha.2 - 09 January 2016

###### Breaking API changes
- All options that could be found at `DSHttpAdapter#defaults` will now be on
the actual instances of `DSHttpAdapter`. e.g. `DSHttpAdapter#defaults.deserialize`
is now at `DSHttpAdapter#deserialize`. This makes it easier to extend the
`DSHttpAdapter` class and override its methods.

###### Backwards compatible API changes
- Added lifecycle methods: beforeFind, afterPOST, etc.
- Added support for the `raw` option

##### 3.0.0-alpha.1 - 12 December 2015

###### Breaking API changes
- Actions are now part of js-data-http, rather than js-data
- Now requires js-data 3.x or greater

###### Backwards compatible API changes
- Added option to support use of `window.fetch`
- Added option to supply custom http implementation

###### Other
- Published the js-data-http-node package, a build of js-data-http that works in Node.js

##### 2.0.0 - 02 July 2015

Stable Version 2.0.0

##### 2.0.0-rc.1 - 30 June 2015

Added `getEndpoint()`, which was removed from JSData

##### 2.0.0-beta.1 - 17 April 2015

Prepare for 2.0

##### 1.2.3 - 07 March 2015

###### Other
- Converted code to ES6.

##### 1.2.2 - 04 March 2015

###### Backwards compatible bug fixes
- #10 - DSHttpAdapter#find does not call queryTransform

###### Other
- Switched build to webpack. UMD should actually work now.

##### 1.2.1 - 25 February 2015

###### Backwards compatible bug fixes
- #9 - Does not properly throw error in find() (like other adapters) when the item cannot be found

##### 1.2.0 - 24 February 2015

###### Backwards compatible API changes
- Added `suffix` option

##### 1.1.0 - 04 February 2015

Now requiring js-data 1.1.0 to allow for safe stringification of cyclic objects

##### 1.0.0 - 03 February 2015

Stable Version 1.0.0

##### 1.0.0-beta.2 - 10 January 2015

Fixed some tests.

##### 1.0.0-beta.1 - 10 January 2015

Now in beta

##### 1.0.0-alpha.6 - 05 December 2014

###### Backwards compatible bug fixes
- Fix for making copies of `options`

##### 1.0.0-alpha.5 - 05 December 2014

###### Backwards compatible bug fixes
- Updated dependencies
- Now safely making copies of the `options` passed into methods

##### 1.0.0-alpha.4 - 01 December 2014

###### Backwards compatible API changes
- Added DSHttpAdapter.getPath

###### Backwards compatible bug fixes
- #8 - Fixed handling of `forceTrailingSlash` option

##### 1.0.0-alpha.3 - 19 November 2014

###### Breaking API changes
- `queryTransform`, `serialize` and `deserialize` now take the resource definition as the first argument instead of just the resource name

##### 1.0.0-alpha.2 - 01 November 2014

###### Backwards compatible API changes
- #4 - Log failures. See also #5 and #6

##### 1.0.0-alpha.1 - 31 October 2014

###### Backwards compatible bug fixes
- #3 - _this.defaults.log() throws Illegal invocation

##### 0.4.2 - 22 October 2014

###### Backwards compatible bug fixes
- Fixed illegal invocation error

##### 0.4.1 - 30 September 2014

###### Backwards compatible API changes
- Added `forceTrailingSlash` option to `DSHttpAdapter#defaults`

###### Other
- Improved checking for the js-data dependency

##### 0.4.0 - 25 September 2014

###### Breaking API changes
- Refactored from `baseUrl` to `basePath`, as `baseUrl` doesn't make sense for all adapters, but `basePath` does

##### 0.3.0 - 21 September 2014

###### Backwards compatible API changes
- Small re-organization.

##### 0.2.0 - 21 September 2014

###### Backwards compatible API changes
- Added deserialize and serialize.

##### 0.1.0 - 17 September 2014

- Initial release
