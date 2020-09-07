import Logger from "@/core/Logger";

const TAG = "Configs";

export default class Configs {

    private static sInstance: Configs;

    public URL_BASE_SERVER = process.env.VUE_APP_URL_BASE_SERVER;
    public URL_M_SERVER = process.env.VUE_APP_URL_M_SERVER;
    public IS_DEBUG = String(process.env.VUE_APP_IS_DEBUG) === '1';

    public static getInstance(): Configs {
        if (this.sInstance == null) {
            this.sInstance = new Configs();
            Logger.log(TAG, "当前环境：", this.sInstance.URL_BASE_SERVER, this.sInstance.IS_DEBUG);
        }
        return this.sInstance;
    }

}
