import * as fs from "fs";

export default (path: string, callback: Function): void | never => {
    fs.exists(path, (isDirectory) => {
        if(!isDirectory) {
            fs.mkdir(path, (err) => {
                if(err) throw err;
            });
        };

        callback();
    });
};