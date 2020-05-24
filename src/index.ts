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
        checkDirectory(this.#path)
        .then(async () => {
            const fileInput: string = `${JSON.stringify({ ...data, time: Date.now() })},,\n`;
            await fs.promises.appendFile(this.#fullPath, fileInput);
        });
    };

    public async findLogs(args: object): Promise<object[]> {
        try {
            const fileData: string = await fs.promises.readFile(this.#fullPath, 'utf8');

            let logs: string[] | object[] = fileData.split(',,');
            logs.pop();

            logs = logs.map(object => JSON.parse(object));
            return (logs as object[]).filter(object => matchObject(object, args));
        } catch(error) {
            throw error;
        };
    };
};

//TODO: Add global types