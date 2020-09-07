<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import BaseVue from "./core/base/BaseVue";

    const TAG = "App";
    @Component({})
    export default class App extends BaseVue {
        onCreated(): void {
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        background-color: #141414;
        color: white;
    }

    b {
        color: #00695C;
    }

    .el-rate__icon {
        font-size: 24px;
    }

    .el-input__inner {
        background-color: #141414;
        border-radius: 4px;
        border: 1px solid #262626;
        color: #FFFFFF;
    }

    .el-select-dropdown {
        background-color: #141414;
        border-radius: 4px;
        border: 1px solid #262626;
        color: #FFFFFF;
    }

    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background-color: #262626;
    }

    .el-select-dropdown__item.selected {
        color: white;
    }
</style>
