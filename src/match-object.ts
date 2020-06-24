/**
 * Check if object matches the other one
 * 
 * @param {Record<string, unknown>} firstObject Major object that will be a model for the matching
 * @param {Record<string, unknown>} secondObject Minor object that will be matching the first one
 * @return {boolean} Return true when they match, otherwise return false
 */
export default (firstObject: Record<string, unknown>, secondObject: Record<string, unknown>): boolean => {
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