const TAG = "EventType";

export default class EventType {
    /**
     * 资方管理详情更新与添加成功
     */
    public static TYPE_LENDER_INFO_UPDATE = 400010;
    /**
     * 机构详情详情更新与添加成功
     */
    public static TYPE_INSTITUTIONS_INFO_UPDATE = 300010;
    /**
     * 案件详情更新
     */
    public static TYPE_CASE_INFO_UPDATE = 200010;
    /**
     * 案件推送更新
     */
    public static TYPE_CASE_PUSH = 200020;
    /**
     * 案件分配列表更新
     */
    public static TYPE_CASE_LIST = 200021;
    /**
     * 贷后数据上传更新
     */
    public static TYPE_LOAN_ZIP_UPLOAD = 500010;


    /**
     * 转债通知添加/编辑
     */
    public static TYPE_DEBT_TEMPLATE_ADD_EDIT = 600010;

    /**
     * 用户新增修改
     */
    public static TYPE_USER_ADD_EDIT = 700010;

    /**
     * 角色新增修改
     */
    public static TYPE_ROLE_ADD_EDIT = 700020;

    /**
     * 资源新增修改
     */
    public static TYPE_RESOURCE_ADD_EDIT = 700030;

    /**
     * 更新侧边栏
     */
    public static TYPE_INIT_ASIDE_ROUTER = 800010;

    /**
     * 案件人员
     */
    public static TYPE_LITIGANT_ADD_EDIT = 900010;

     /**
     * 案件公司
     */
    public static TYPE_COMPANY_ADD_EDIT = 900012;


}
