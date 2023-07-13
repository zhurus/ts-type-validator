export class Validator {
    private registry: {[k: string]: any} = {}

    constructor() {}
    
    register(name: string, scheme: Object | string) {
        this.registry[name] = scheme;
    }
    validate(obj: any, scheme: Object | string | string[] | Object[]): boolean {
        if (Validator._isArray(obj) && Validator._isArray(scheme)) {
            return this._validateArray(obj, scheme as (string | Object)[]);
        }
        else if (Validator._isObject(obj) && (Validator._isObject(scheme) || typeof scheme === "string")) {
            return this._validateObject(obj, scheme);
        }
        else if (typeof obj !== "object" && typeof scheme === "string") {
            return this._validateValue(obj, scheme);
        }
        return false;
    }
    private _validateValue(obj: any, scheme: string) {
        return scheme === typeof obj || this.registry[scheme] === typeof obj;
    }
    private _validateArray(arr: any[], scheme: (string | Object)[]): boolean {
        if (scheme.length !== 1) {
            return false;
        }
        for (let el in arr) {
            if (!this.validate(arr[el], scheme[0])) {
                return false;
            }
        }
        return true;
    }
    private _validateObject(obj: Object, scheme: Object | string) {
        let schemeObj = typeof scheme === "object" ? scheme : this.registry[scheme];
        if (typeof schemeObj !== "object") {
            return false;
        }
        for (let key in schemeObj) {
            let subValue = (obj as {[k:string]: any})[key];
            if (!this.validate(subValue, schemeObj[key])) {
                return false;
            }
        }
        return true;
    }
    private static _isObject(value: any): boolean {
        return typeof value === "object" && !(value instanceof Array);
    }
    private static _isArray(value: any): boolean {
        return value instanceof Array;
    }
}
