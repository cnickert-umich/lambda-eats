export default class FieldValidationUtil {
    static assertObjHasExpectedFields(obj: object, expectedFields: string[]) {
        const actualFields = Object.keys(obj).sort();
        expectedFields.sort();
        const hasExpectedFields = JSON.stringify(actualFields) === JSON.stringify(expectedFields);
        if(!hasExpectedFields) {
            throw `Field validation failed. Expected keys: ${expectedFields}. Actual keys ${actualFields}.`;
        }
    }
}