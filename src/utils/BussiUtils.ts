/**
 * 常见业务工具类
 */
import {each} from "lodash"
import Logger from "@/core/Logger";
import TextUtils from "@/utils/TextUtils";

export default class BussiUtils {
    /**
     *
     * @param data
     * @param optionSource 源字段
     * @param optionTarget 目标字段
     *
     * optionSource，optionTarget列表要一一对应
     *
     * data 形如[{}, {}]
     */
    public static handleRespDataToSelect(data: object[], optionSource: string[], optionTarget: string[]) {
        try {
            let arrayReturn: any[] = [];
            each(data, (item, key) => {
                let objectReturn = {};
                each(item, (dataItem, keyItem) => {
                    let index: number = optionSource.indexOf(keyItem);
                    let targetColumn: any = optionTarget[index];
                    if (index >= 0) { //判断字段存在optionSource列表中，变为新属性名
                        // @ts-ignore
                        objectReturn[targetColumn] = item[keyItem];
                    }
                })
                arrayReturn.push(objectReturn);
            })
            return arrayReturn;
        } catch (e) {
            return data;
        }
    }

    /**
     * 去除上传数据中无用参数
     *
     * @param data       形如：{name: '111', id: '6666'}
     * @param params     需要上传的参数
     *
     */
    public static requestRemoveUselessParams(data: any, ...params: string[]) {
        let responseData = {};
        params.forEach((item: string, key: number) => {
            // @ts-ignore
            responseData[item] = TextUtils.isEmpty(data[item]) ?"" : data[item];
        })
        return responseData;
    }

    public static filterOrerDueDays(day: string): string {
        if (!day) {
            return "--";
        }
        let newDay = Math.ceil(Number(day) / 30);
        let str = "--";
        if (newDay <= 24) {
            str = "M" + newDay;
        } else {
            str = "M24+";
        }
        return str;
    }
}
