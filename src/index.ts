import * as fs from 'fs';
import validate from './validate';
import checkDirectory from './check-directory';
import matchObject from './match-object';

export default class Logger {
    #path: string;
    #filename: string;
    #fullPath: string;

    constructor({ path, filename }: { path: string, filename: string }) {
        validate({ path, filename });

        this.#path = path;
        this.#filename = filename;
        this.#fullPath = `${path}/${filename}`;
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
            const fileInput: string = `\n${JSON.stringify({ ...data, time: Date.now() })},,`;

            fs.appendFile(this.#fullPath, fileInput, (err) => {
                if(err) throw err;
            });
        });
    };

    public async findLogs(args: object): Promise<object[]> {
        let objects: string[] | object[];

        try {
            const data: string = await fs.promises.readFile(this.#fullPath, 'utf8');

            objects = data.split(',,');
            objects.pop();

            objects = objects.map(object => JSON.parse(object));
            return (objects as object[]).filter(object => matchObject(object, args));
        } catch(error) {
            throw error;
        };
    };
};

const logger: Logger = new Logger({ path: './logs', filename: 'main.log' });
// logger.log({ message: 'Test message' });
// logger.findLogs({ message: 'Test message', time: 1590301183544 })
// .then((data) => console.log(data));