/**
 * Match 工具类
 */
export default class MathUtils {
    /**
     * 加法
     * @param arg1
     * @param arg2
     */
    public static accAdd(arg1: any, arg2: any): string {
        let r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return String((arg1 + arg2) / m);
    }

    /**
     * 减法
     * @param arg1
     * @param arg2
     */
    public static accSub(arg1: any, arg2: any): string {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    /**
     * 乘法
     * @param arg1
     * @param arg2
     */
    public static accMul(num1: any, num2: any): string {
        let baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) {
        }
        return (Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum)).toString();
    }


    /**
     * 除法
     * @param num1
     * @param num2
     */
    public static accDiv(num1: any, num2: any): string {
        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = num1.toString().split(".")[1].length
        } catch (e) {
        }
        try {
            t2 = num2.toString().split(".")[1].length
        } catch (e) {
        }

        r1 = Number(num1.toString().replace(".", ""));

        r2 = Number(num2.toString().replace(".", ""));
        return String((r1 / r2) * Math.pow(10, t2 - t1));
    }
}
