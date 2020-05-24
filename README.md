![npm (scoped)](https://img.shields.io/npm/v/@stargaze/logger)  ![NPM](https://img.shields.io/npm/l/@stargaze/logger)

*Logger that you can use for anything you want.*

## Install
```
$ npm install @stargaze/logger
```

## Usage
Create new logger instance
```js
const logger = new Logger({ path: 'myPath', filename: 'myFilename.log' });
```

Log to the file
```js
logger.log({ foo: 'bar', field: 'success' });
```

Find logs matching provided arguments
```js
logger.findLogs({ foo: 'bar' });
```

## Contributing
1. Fork it (https://github.com/PiotrBlachnio/npm-logger/fork)
1. Create your feature branch (git checkout -b feature/fooBar)
1. Commit your changes (git commit -am 'Add some fooBar')
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request