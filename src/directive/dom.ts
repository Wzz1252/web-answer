import Vue from "vue";
import TextUtils from "@/utils/TextUtils";
import Logger from "@/core/Logger";

const TAG = "dom.ts"

// 针对 el-input做的限制，只能输入0和正整数
Vue.directive("int", {
    bind: function(el, binding) {
        const input = el.getElementsByTagName("input")[0];
        input.onkeyup = function() {
            input.value = input.value.replace(/[^\d]/g, "");

            binding.value && checkInputValue(binding.value.min, binding.value.max, input);

            trigger(input, "input");
        };
        input.onblur = function() {
            input.value = input.value.replace(/[^\d]/g, "");

            binding.value && checkInputValue(binding.value.min, binding.value.max, input);

            trigger(input, "input");
        };
    },
});
const trigger = (el: any, type: string) => {
    const e = new Event(type, {"bubbles":true, "cancelable":true});
    el.dispatchEvent(e);
};

const checkInputValue = (min: any, max: any, input: any) => {
    try {
        if (!TextUtils.isEmpty(min) && !TextUtils.isEmpty(max)) {
            if (Number(min) > Number(max)) {
                input.value = ""
            }

            if (Number(input.value) > Number(max)) {
                input.value = ""
            }

            if (Number(input.value) < Number(min)) {
                input.value = ""
            }
        }
        if (TextUtils.isEmpty(min) && !TextUtils.isEmpty(max)) {
            if (Number(input.value) > Number(max)) {
                input.value = ""
            }
        }

        if(!TextUtils.isEmpty(min) && TextUtils.isEmpty(max)) {
            if (Number(input.value) < Number(min)) {
                input.value = ""
            }
        }
    } catch (e) {
        Logger.info(TAG,"checkInputValue: ", e)
    }

}
