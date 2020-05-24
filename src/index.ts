import * as fs from 'fs';
import validate from './validate';
import checkDirectory from './check-directory';

export default class Logger {
    #path: string;
    #filename: string;

    constructor({ path, filename }: { path: string, filename: string }) {
        validate({ path, filename });

        this.#path = path;
        this.#filename = filename;
    };

    public getPath(): string {
        return this.#path;
    };

    public setPath(path: string): void {
        this.#path = path;
    };

    public getFilename(): string {
        return this.#filename;
    };

    public setFilename(filename: string) {
        this.#filename = filename;
    };

    public log(data: object): void | never {
        checkDirectory(this.#path, () => {
            const fullPath: string = `${this.#path}/${this.#filename}`;
            const fileInput: string = `\n${JSON.stringify({ ...data, time: Date.now() })},,`;

            fs.appendFile(fullPath, fileInput, (err) => {
                if(err) throw err;
            });
        });
    };

    public compareData(): void {
        const fullPath: string = `${this.#path}/${this.#filename}`;

        fs.readFile(fullPath, 'utf8', (err, data) => {
            if(err) throw err;

            const objects: string[] = data.split(',,');
            objects.pop();
        });
    };
};

// const logger: Logger = new Logger({ path: './logs', filename: 'main.log' });
// logger.log({ message: 'Test message' });
// logger.compareData();