import { exists, mkdir } from "fs";

export default (path: string, callback: Function): void | never => {
    exists(path, (isDirectory) => {
        if(!isDirectory) {
            mkdir(path, (err) => {
                if(err) throw err;
            });
        };

        callback();
    });
};