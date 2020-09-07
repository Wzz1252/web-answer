import {expect, assert} from 'chai'
import LenderList from "@/views/capital-manager/LenderList.vue";
import {shallowMount} from '@vue/test-utils'
import Logger from "@/core/Logger";

const TAG = "Test LenderList";

describe("LenderList（资方列表）", () => {
    const msg = "new message";
    const wrapper = shallowMount(LenderList, {
        propsData: { msg }
    })

   // let btn =  wrapper.find("el-button");
   //  Logger.log(TAG, btn);

    /*it('renders props.msg when passed', () => {
      const msg = 'new message'
      const wrapper = shallowMount(HelloWorld, {
        propsData: { msg }
      })
      expect(wrapper.text()).to.include(msg)
    })*/
})
