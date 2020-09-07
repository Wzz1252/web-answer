import {isNumber, round, isNil, isNaN} from "lodash";

// @ts-ignore
export default {
    install(Vue: any, options: any) {
        /**
         * 处理普通字符串，如果为 null，自动转成 --
         */
        Vue.filter("filterStr", (value: any, str: any) => {
            return isNil(value) || value === "" ? "--" : (str || value);
        });

        /**
         * 处理字符串，将其转成百分比，如果为 null，自动转成 --
         */
        Vue.filter("filterPercent", (value: any, decimal: any = 0, multi: any = 100, unit: any = "%") => {
            if (!isNil(value) && !isNaN(value)) {
                return round(value * multi, decimal).toFixed(decimal) + (unit || "");
            }
            return (isNil(value) || isNaN(value)) ? "--" : value;
        })

        /**
         * 处理身份证，中间隐藏
         */
        Vue.filter("filterIdCard", (value: any) => {
            return (isNil(value) || isNaN(value)) ? "--" : value.replace(/(\d{6})\d{6}(\d+)/, "$1****$2");
        })
    }
}
