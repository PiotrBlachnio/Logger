import { exists, mkdir } from "fs";

export default (path: string): void | never => {
    exists(path, (isDirectory) => {
        if(!isDirectory) {
            mkdir(path, (err) => {
                if(err) throw err;
            });
        };
    });
};