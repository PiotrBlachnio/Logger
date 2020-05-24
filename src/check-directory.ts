import * as fs from "fs";

/**
 * Check if directory exists, if does not, then create new one
 * 
 * @param {string} path Path to the directory that will be checked
 * @return {void | never} When directory exists or not, resolve promise
 */
export default (path: string): Promise<void | never> => {
    return new Promise(async(resolve, reject) => {
        try {
            await fs.promises.access(path);
            resolve();
        } catch(error) {
            if(error.code !== 'ENOENT') reject(error);

            await fs.promises.mkdir(path);
            resolve();
        };
    });
};