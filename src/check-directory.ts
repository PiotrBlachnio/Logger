import * as fs from "fs";

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