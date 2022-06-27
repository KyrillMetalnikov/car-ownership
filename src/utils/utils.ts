export function isEmptyObject(obj:Object) {
    if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
}

export const baseURL = "http://localhost:3000/people/";