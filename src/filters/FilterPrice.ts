import {isNumber, round, isNil, isNaN} from "lodash"
import numeral from "numeral"

export default {
    install(Vue: any, options: any) {
        /**
         * 货币格式化
         * @param value 值
         * @param prefix 前缀 默认：￥
         * @param suffix 后缀
         */
        Vue.filter("filterCurrency", (value: any, prefix: any = "￥", suffix: any = "") => {
            if (!isNil(value) && !isNaN(value)) {
                try {
                    return prefix + numeral(round(value, 2)).format("0,0.00") + suffix;
                } catch (e) {
                    return prefix + "--";
                }
            }
            return (isNil(value) || isNaN(value)) ? "--" : value;
        });

        /**
         * 万元格式化
         * @param value 值
         * @param suffix 后缀
         */
        Vue.filter("filterThousand", (value: any, suffix: any = "万元") => {
            if (isNumber(value)) {
                try {
                    return numeral(value / 10000).format("0,0.00") + suffix;
                } catch (e) {
                    return "--" + suffix;
                }
            }
            return value || ("--" + suffix);
        });

        Vue.filter("ktHM", (value: any, suffix: any = "亿元") => {
            if (Number(value)) {
                return numeral(value / 100000000).format("0,0.00") + suffix;
            }
            return isNil(value) ? "--" : value;
        });
    }
}
