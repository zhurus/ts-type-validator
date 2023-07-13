import { Validator } from './validator';


describe("Test types validator", ()=>{
    let validator = new Validator;
    validator.register("position", {x: "number", y: "number"});
    test("Primitive types validation", () => {
        expect(validator.validate(1, "number")).toBe(true);
        expect(validator.validate(true, "string")).toBe(false);
        expect(validator.validate(true, "boolea")).toBe(false); // typo
    });
    test("Object validation", () => {
        expect(validator.validate({x: 1, y: 2}, "position")).toBe(true);
        expect(validator.validate({z: 1, y: 2}, "position")).toBe(false);   // differ property name
        expect(validator.validate({x: 1, y: 2}, "positio")).toBe(false);    // typo
        expect(validator.validate(1, "position")).toBe(false);
        expect(validator.validate([{x: 1, y:2}], "position")).toBe(false);
    });
    test("Array validation", () => {
        // array validation
        expect(validator.validate([2, 4], ["number"])).toBe(true);
        expect(validator.validate([2, 4], ["number", "string"])).toBe(false);   // several tokens in scheme array
        expect(validator.validate([2, true], ["number"])).toBe(false);
        expect(validator.validate([
            { x: 1, y: 2 }, 
            { x: 3, y: 4 }
        ], ["position"])).toBe(true);
        expect(validator.validate([ 
            { x: 1, condition: true },
            { x: 3, condition: false }
        ], 
        [{ x: "number", condition: "boolean" }]
        )).toBe(true);
    });
});