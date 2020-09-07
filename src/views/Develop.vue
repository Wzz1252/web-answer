<template>
    <div class="develop-base-layout">
        <skew-layout style="margin-top: 2px; width: 400px;" size="big" backgroundColor="#FFFFFF" fontColor="#000000"/>
        <skew-layout style="margin-top: 2px; width: 300px;" size="medium" backgroundColor="#FFFFFF"
                     fontColor="#000000"/>
        <skew-layout style="margin-top: 2px; width: 200px;" size="small" backgroundColor="#FFFFFF" fontColor="#000000"/>
        <skew-layout style="margin-top: 2px; width: 100px;" size="mini" backgroundColor="#FFFFFF" fontColor="#000000"/>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import BaseVue from "@/core/base/BaseVue";
    import SkewLayout from "@/components/SkewLayout.vue";

    const TAG = "Develop";
    @Component({
        name: "Develop",
        components: {SkewLayout}
    })
    export default class Develop extends BaseVue {
    }
</script>

<style lang="scss">
    .develop-base-layout {
        display: flex;
        flex-direction: column;
    }
</style>
