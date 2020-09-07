export default class AuthUrl {

    /**
     * 获取用户列表
     */
    public static URL_POST_USER_LIST = () => "/api/usermanage/v1/user/pageExt";
    /**
     * 用户详情查询
     */
    public static URL_GET_USER_DETAIL = () => `/api/usermanage/v1/user/detailExt`;
    /**
     * 新增用户
     */
    public static URL_POST_USER_ADD = () => "/api/usermanage/v1/user/add";
    /**
     * 修改用户
     */
    public static URL_POST_USER_UPDATE = () => `/api/usermanage/v1/user/update2`;
    /**
     * 启用禁用用户
     * enabled: false: 禁用，true: 启用
     */
    public static URL_POST_USER_UPDATE_ENABLED = () => '/api/usermanage/v1/user/update/enabled2';
    /**
     * 角色列表
     */
    public static URL_POST_ROLE_PAGE_LIST = () => "/api/usermanage/v1/role/pageList";
    /**
     * 一次性获得所有角色
     */
    public static URL_GET_ROLE_LISTS = () => "/api/usermanage/v1/role/list2"; 
    /**
     * 创建角色
     */
    public static URL_POST_CREATE_ROLE = () => `/api/usermanage/v1/role/create2`;
    /**
     * 修改角色
     */
    public static URL_POST_UPDATE_ROLE = () => `/api/usermanage/v1/role/update2`;
    /**
     * 删除角色
     */
    public static URL_POST_DELETE_ROLE = (id: string) => `/api/usermanage/v1/role/delete/${id}`;

    /**
     * 资源树查询
     */
    public static URL_GET_FUNCTIONAL_TREE = () => "/api/usermanage/v1/functional-groups/tree/list";

    /**
     * 增加资源
     */
    public static URL_POST_PERMISSION_CREAT = () => "/api/usermanage/v1/function/create";
    /**
     * 修改资源
     */
    public static URL_POST_PERMISSION_UPDATE = () => "/api/usermanage/v1/function/update";
    /**
     * 删除资源
     */
    public static URL_POST_PERMISSION_DELETE = (id: string) => `/api/usermanage/v1/function/delete/${id}`;
    /**
     * 获取权限列表
     *
     */
    public static URL_GET_PERMISSION_LIST = () => '/api/usermanage/v1/permission/lists';
    /**
     * 根据角色ID查询功能ID集合
     *
     */
    public static URL_GET_LIST_FUNCTIONS_BY_ID = () => `/api/usermanage/v1/functional-points/role`;
    /**
     * 查询登录用户有权限的功能
     * https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/user-apis.md
     */
    public static URL_GET_FUNCTION_ACCESS = () => `/api/usermanage/v1/function/access/list`;
    /**
     * 根据资源ID查询接口集合
     *
     */
    public static URL_GET_PERMISSION_BY_POINT_ID = () => `/api/usermanage/v1/permission/listByPointIds`;


}
