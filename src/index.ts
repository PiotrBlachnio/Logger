import { appendFile } from 'fs';
import validate from './validate';
import checkDirectory from './check-directory';

export default class Logger {
    private path: string;
    private filename: string;

    constructor({ path, filename }: { path: string, filename: string }) {
        validate({ path, filename });

        this.path = path;
        this.filename = filename;
    };

    public getPath(): string {
        return this.path;
    };

    public setPath(path: string): void {
        this.path = path;
    };

    public getFilename(): string {
        return this.filename;
    };

    public setFilename(filename: string) {
        this.filename = filename;
    };

    public log(data: object): void {
        checkDirectory(this.path, () => {
            const fullPath: string = `${this.path}/${this.filename}`;
            const fileInput: string = `\n${JSON.stringify({ ...data, time: Date.now() })}`;

            appendFile(fullPath, fileInput, (err) => {
                if(err) throw err;
            });
        });
    };
};