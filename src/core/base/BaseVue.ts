import {Component} from "vue-property-decorator";
import LifeCycleVue from "@/core/base/LifeCycleVue";
import Logger from "@/core/Logger";
import AlertBodyEntity from "@/entity/common/AlertBodyEntity";
import ConfirmBodyEntity from "@/entity/common/ConfirmBodyEntity";

const TAG = "BaseVue";

@Component
export default class BaseVue extends LifeCycleVue {
	/**
	 * 设置每个浏览器的页面标题
	 * @param title
	 */
	public setTitle(title: string) {
		document.title = title || "";
	}

	/**
	 * 返回路由媒体信息
	 */
	getMeta(): any {
		return this.$route.meta;
	}

	getParams(): any {
		return this.$route.params;
	}

	getQuery(): any {
		return this.$route.query;
	}

	protected back(): void {
		this.$router.go(-1);
	}

	/**
	 * 表单验证
	 * @param refName from表单组件的名字
	 * @param callback 通知回调
	 */
	public formValidate(refName: string, callback: (valid: boolean) => void) {
		// @ts-ignore
		this.$refs[refName].validate((valid: any) => {
			if (callback) {
				callback(valid);
			}
		});
	}

	public msgSuccess(str: string) {
		this.$message.success(str || "");
	}

	public msgError(err: string, options: ConfirmBodyEntity = {}) {
		let opt = Object.assign(options, {type: "error", message: err});
		this.$message(opt);
	}

	public msgInfo(err: string) {
		this.$message.info(err || "");
	}

	public msgWarning(err: string) {
		this.$message.warning(err || "");
	}

	public msgSuccessTask(taskId: string, msg: string) {
		this.$message({
			type: "success",
			message: `${msg}, 任务 ID: <strong><a href="/asyncJobsDetail?id=${taskId}">${taskId}</a></strong>`,
			showClose: true,
			duration: 0,
			dangerouslyUseHTMLString: true
		});
	}

	public msgAlert(options: AlertBodyEntity) {
		let defaultOptions = new AlertBodyEntity();

		options = Object.assign(defaultOptions, options);

		this.$alert(options.message, options.title, {
			confirmButtonText: options.confirmButtonText,
			dangerouslyUseHTMLString: options.dangerouslyUseHTMLString,
			callback: action => {
				if (options.callback) {
					options.callback();
				}
			}
		});
	}
}
