export default class BaseEnumAdapter {

    static findObjByType(enumObj: any, type: string) {
        for (let keyItem in enumObj) {
            let obj = enumObj[keyItem] || {};
            if (String(obj.type) === String(type)) {
                return obj;
            }
        }
        return {}
    }

    static returnListForObj(enumObj: any) {
        let obj = [];
        for (let keyItem in enumObj) {
            obj.push(enumObj[keyItem]);
        }
        return obj;
    }
}
