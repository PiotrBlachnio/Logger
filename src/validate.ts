export default (data: {}): void | never => {
    const keys: string[] = Object.keys(data);

    keys.forEach((key: string) => {
        switch(key) {
            case 'path':
                const path: any = data[key];

                if(typeof path !== 'string') throw new Error('Path must be a string!');
                if(path.trim() === '') throw new Error('Path must be specified!');
                break;
            case 'filename':
                const filename: any = data[key];

                if(typeof filename !== 'string') throw new Error('Filename must be a string!');
                if(filename.trim() === '') throw new Error('Filename must be specified!');
                break;
        };
    });
};