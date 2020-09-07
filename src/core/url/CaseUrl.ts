/**
 * 调解案子相关
 */
export default class CaseUrl {
	/**
	 * 调解详情
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 * @param id 调解ID
	 */
	public static URL_GET_MEDIATION_CASE_DETAILS = (id: string) => `/op/v1/mediation/${id}`;
	/**
	 * 调解更新
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 */
	public static URL_PUT_MEDIATION_CASE_DETAILS = () => `/op/v1/mediation`;

	/**
	 * 查询调解信息操作记录
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 * @param id 调解ID
	 */
	public static URL_GET_MEDIATION_HANDLING_RECORD = (id: string) => `/op/v1/mediation/handling/record/${id}`;

	/**
	 * 新增调解操作记录
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 * @param id 调解ID
	 */
	public static URL_POST_MEDIATION_HANDLING_ADD = () => `/op/v1/mediation/handling`;

	/**
	 * 送达记录
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 * @param id 调解ID
	 */
	public static URL_GET_MEDIATION_SEND_RECORD_LIST = (id: string) => `/op/v1/mediation/message/sended/record/${id}`;

	/**
	 * 登出
	 */
	public static URL_POST_LOGOUT = () => "/op/v1/logout";

	/**
	 * 查询当事人
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 */
	public static URL_GET_MEDIATION_LITIGANT = () => `/op/v1/mediation/litigant`;

	/**
	 * 查询企业
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 */
	public static URL_GET_MEDIATION_COMPANY = () => `/op/v1/mediation/company`;
	/**
	 * 添加当事人
	 * https://gitlab.ktjr.com/mediation/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/mediation-api.md
	 */
	public static URL_POST_MEDIATION_LITIGANT = () => `/op/v1/mediation/litigant`;

	// TODO ------------------------------ 临时测试 ----------------------------------------
	/**
	 * 诉状模板字段导出（支持非全量导出）
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_GET_COMPLAINT_TEMPLATE_DOWNLOAD = () => `/op/v1/complaint-templates/fields/excelHeaderDownload`;
	/**
	 * 诉状模板字段添加
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_POST_COMPLAINT_TEMPLATE_ADD = () => "/op/v1/complaint-templates/fields";

	/**
	 * 指定诉状模板对应字段导出
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_GET_COMPLAINT_TEMPLATES_FIELDS_DOWNLOAD = (id: string) => `/op/v1/complaint-templates/${id}/fields/download`;
	/**
	 * 诉状模板字段全量查询
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_GET_COMPLAINT_TEMPLATES_FIELDS = () => "/op/v1/complaint-templates/fields";
	/**
	 * 诉状模板字段修改
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_PUT_COMPLAINT_TEMPLATE_UPDATE = () => "/op/v1/complaint-templates/fields";
	/**
	 * 诉状模板字段删除
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_POST_COMPLAINT_TEMPLATE_DELETE = (id: string) => `/op/v1/complaint-templates/fields/${id}/delete`;
	/**
	 * 诉状模板列表分页查询
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_GET_COMPLAINT_LIST = () => `/op/v1/complaint-templates`;
	/**
	 * 诉状模板删除
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_POST_COMPLAINT_TEMPLATES_DELETE = (id: string) => `/op/v1/complaint-templates/${id}/delete`;
	/**
	 * 诉状模板详情查看
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_GET_COMPLAINT_TEMPLATES = (id: string) => `/op/v1/complaint-templates/${id}`;
	/**
	 * 诉状模板新增
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_POST_COMPLAINT_TEMPLATES_CREATE = () => `/op/v1/complaint-templates/create`;
	/**
	 * 诉状模板修改
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_PUT_COMPLAINT_TEMPLATES_UPDATE = () => `/op/v1/complaint-templates/update`;
	/**
	 * 诉状模板发布
	 * {@link https://gitlab.ktjr.com/loan-collection/doc/blob/master/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/case-apis.md}
	 */
	public static URL_POST_COMPLAINT_TEMPLATES = () => `/op/v1/complaint-templates/submit`;

}
