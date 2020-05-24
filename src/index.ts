import * as fs from 'fs';
import validate from './validate';
import checkDirectory from './check-directory';
import matchObject from './match-object';

export default class Logger {
    #path: string;
    #filename: string;

    /**
     * Construct new Logger instance
     * 
     * @param {string} path Path to the output directory
     * @param {string} filename Name of file where logs will be inputed
     */
    constructor({ path, filename }: { path: string, filename: string }) {
        validate({ path, filename });

        this.#path = path;
        this.#filename = filename;
    };

    /**
     * Get path property
     * 
     * @return {void} Return value of the path property
     */
    public getPath(): string {
        return this.#path;
    };

    /**
     * Get filename property
     * 
     * @return {void} Return value of the filename property
     */
    public getFilename(): string {
        return this.#filename;
    };

    /**
     * Set path to a given string
     * 
     * @param {string} path String to which path will be changed
     * @return {void | never} Return void when setted successfully, otherwise throw an error
     */
    public setPath(path: string): void | never {
        validate({ path });
        this.#path = path;
    };

    /**
     * Set filename to a given string
     * 
     * @param {string} filename String to which filename will be changed
     * @return {void | never} Return void when setted successfully, otherwise throw an error
     */
    public setFilename(filename: string): void | never {
        validate({ filename });
        this.#filename = filename;
    };

    /**
     * Append data to the file in the form of a log
     * 
     * @param {object} data Data as an object for the file input
     * @return {void | never} Resolve when writing to file was successful
     */
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

    /**
     * Filter logs from the file by matching with the given object
     * 
     * @param {object} args The object for the comparison
     * @return {object[] | never} Return array of objects if those were found, otherwise return an empty array
     */
    public async findLogs(args: object): Promise<object[] | never> {
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