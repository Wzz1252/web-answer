import moment from "moment"

export default {
    install(Vue: any, options: any) {
        Vue.filter("filterTimeWithoutMils", (data: any) => { //去除毫秒
            if (!data) {
                return "--";
            }
            let index = data.indexOf(".");
            return index > -1 ? data.slice(0, index) : data;
        });

        Vue.filter("roleFilter", (data: any, name: any) => {
            return data ? data + "(" + name + ")" : "--";
        });

        Vue.filter("filterTime", (val: any) => {
            return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "--";
        });

        Vue.filter("filterYear", (val: any) => {
            return val ? moment(val).format("YYYY-MM-DD") : "--";
        });

        Vue.filter("filterTimeWithoutYear", (val: any) => {
            return val ? moment(val).format("YYYY-MM-DD HH:mm:ss").substr(5) : "--";
        });
    }
}
