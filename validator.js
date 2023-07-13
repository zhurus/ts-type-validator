"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    constructor() {
        this.registry = {};
    }
    register(name, scheme) {
        this.registry[name] = scheme;
    }
    validate(obj, scheme) {
        if (Validator._isArray(obj) && Validator._isArray(scheme)) {
            return this._validateArray(obj, scheme);
        }
        else if (Validator._isObject(obj) && (Validator._isObject(scheme) || typeof scheme === "string")) {
            return this._validateObject(obj, scheme);
        }
        else if (typeof obj !== "object" && typeof scheme === "string") {
            return this._validateValue(obj, scheme);
        }
        return false;
    }
    _validateValue(obj, scheme) {
        return scheme === typeof obj || this.registry[scheme] === typeof obj;
    }
    _validateArray(arr, scheme) {
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
    _validateObject(obj, scheme) {
        let schemeObj = typeof scheme === "object" ? scheme : this.registry[scheme];
        if (typeof schemeObj !== "object") {
            return false;
        }
        for (let key in schemeObj) {
            let subValue = obj[key];
            if (!this.validate(subValue, schemeObj[key])) {
                return false;
            }
        }
        return true;
    }
    static _isObject(value) {
        return typeof value === "object" && !(value instanceof Array);
    }
    static _isArray(value) {
        return value instanceof Array;
    }
}
exports.Validator = Validator;
