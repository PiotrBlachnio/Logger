export default (firstObject: object, secondObject: object): boolean => {
    let isValid: boolean = true;
    const keys: string[] = Object.keys(secondObject);

    for(let key of keys) {
        if(secondObject[key] !== firstObject[key]) {
            isValid = false;
            break;
        };
    };

    return isValid;
};