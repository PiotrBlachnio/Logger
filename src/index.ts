import * as fs from 'fs';
import validate from './validate';
import checkDirectory from './check-directory';
import matchObject from './match-object';

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
        validate({ path });
        this.#path = path;
    };

    public getFilename(): string {
        return this.#filename;
    };

    public setFilename(filename: string) {
        validate({ filename });
        this.#filename = filename;
    };

    public log(data: object): Promise<void | never> {
        return new Promise((resolve, reject) => {
            const fullPath: string = `${this.#path}/${this.#filename}`;

            checkDirectory(this.#path)
            .then(async () => {
                const fileInput: string = `${JSON.stringify({ ...data, time: Date.now() })},,\n`;
                await fs.promises.appendFile(fullPath, fileInput);

                resolve();
            })
            .catch(err => reject(err));
        });
    };

    public async findLogs(args: object): Promise<object[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const fullPath: string = `${this.#path}/${this.#filename}`;
                const fileData: string = await fs.promises.readFile(fullPath, 'utf8');
    
                let logs: string[] | object[] = fileData.split(',,');
                logs.pop();
    
                logs = logs.map(object => JSON.parse(object));
                resolve((logs as object[]).filter(object => matchObject(object, args)));
            } catch(error) {
                reject(error);
            };
        });
    };
};
//TODO: Add global types