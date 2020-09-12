![npm (scoped)](https://img.shields.io/npm/v/@primaxx/logger)  ![NPM](https://img.shields.io/npm/l/@primaxx/logger)

*Logger that you can use for anything you want.*

## Install
```
$ npm install @primaxx/logger
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

Remove all logs from the file
```js
logger.removeLogs();
```

## Contributing
1. Fork it (https://github.com/primaxx/logger/fork)
1. Create your feature branch (git checkout -b feature/fooBar)
1. Commit your changes (git commit -am 'Add some fooBar')
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request
