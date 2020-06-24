/**
 * Check if provided data is valid
 * 
 * @param {Record<string, unknown>} data Object that can contain path or/and filename
 * @return {void | never} Return void when provided data is valid, otherwise throw an error
 */
export default (data: Record<string, unknown>): void | never => {
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