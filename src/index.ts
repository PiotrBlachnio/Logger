import { appendFile, mkdir, exists } from 'fs';

export default class Logger {
    private path: string;
    private filename: string;

    constructor({ path, filename }: { path: string, filename: string }) {
        this.path = path;
        this.filename = filename;
    };

    public log(data: object): void {
        exists(this.path, (isDir: boolean) => {
            if(!isDir) {
                mkdir(this.path, (err) => {
                    if(err) throw err;

                });
            };
        });

        appendFile(`${this.path}/${this.filename}`, `${JSON.stringify(data)}`, (err) => {
            if (err) throw err;
        });    
    };
};