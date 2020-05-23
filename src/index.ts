import { appendFile } from 'fs';

export default class Logger {
    private path: string;

    constructor({ path }: { path: string }) {
        this.path = path;
    };

    public log(type: string, message: string): void {
        
    };
};