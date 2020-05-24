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

    public async findLogs(args: object): Promise<object[]> {
        const fullPath: string = `${this.#path}/${this.#filename}`;
        let objects: string[] | object[];

        try {
            const data: string = await fs.promises.readFile(fullPath, 'utf8');

            objects = data.split(',,');
            objects.pop();

            objects = objects.map(object => JSON.parse(object));
            return (objects as object[]).filter(object => typeof object === 'object');
        } catch(error) {
            throw error;
        };
    };
};

// const logger: Logger = new Logger({ path: './logs', filename: 'main.log' });
// logger.log({ message: 'Test message' });
// logger.findLogs({})
// .then((data) => console.log(data));