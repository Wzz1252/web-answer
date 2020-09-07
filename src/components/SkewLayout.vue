<template>
    <div class="skew-layout-base-layout" :style="`margin-left: 0; margin-right: 40px; width: ${width}px;`">
        <div class="skew-layout" @click="onClick">
            <div class="skew-background-layout" :style="`background-color: ${backgroundColor};`"></div>
            <div v-if="leftAngle" class="skew-background-left" :style="`background-color: ${backgroundColor};`"></div>
            <div class="core-layout">
                <div :class="size" :style="
                `color: ${fontColor};` +
                `text-align: ${textAlign};`
                ">{{title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import BaseVue from "@/core/base/BaseVue";
    import {Prop} from "vue-property-decorator";

    const TAG = "SkewLayout";
    @Component({
        name: "SkewLayout",
        components: {}
    })
    export default class SkewLayout extends BaseVue {
        @Prop({default: "测试", type: String})
        public title!: string;

        /** big、medium、small、mini */
        @Prop({default: "medium", type: String})
        public size!: string;

        @Prop({default: "#262626", type: String})
        public backgroundColor!: string;

        @Prop({default: "#FFFFFF", type: String})
        public fontColor!: string;

        @Prop({default: "left", type: String})
        public textAlign!: string;

        /** 左侧是否是直角（true: 是） */
        @Prop({default: true, type: Boolean})
        public leftAngle!: boolean;

        /** 左侧是否是直角（true: 是） */
        @Prop({default: "", type: String})
        public width!: string;

        public onClick():void {
            this.$emit("click");
        }

    }
</script>

<style lang="scss">
    .skew-layout-base-layout {
        display: flex;
        flex-direction: column;

        .skew-layout {
            position: relative;

            .core-layout {
                position: relative;
                display: flex;

                .big {
                    font-size: 26px;
                    padding: 16px;
                    font-weight: bold;
                    width: 100%
                }

                .medium {
                    font-size: 22px;
                    padding: 14px;
                    font-weight: bold;
                    width: 100%
                }

                .small {
                    font-size: 18px;
                    padding: 12px;
                    font-weight: bold;
                    width: 100%
                }

                .mini {
                    font-size: 14px;
                    padding: 10px;
                    font-weight: bold;
                    width: 100%
                }
            }

            .skew-background-layout {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                transform: skew(-45deg);
                background-color: #262626;
            }

            .skew-background-left {
                position: absolute;
                top: 0;
                left: -40px;
                bottom: 0;
                right: 40px;
                background-color: #262626;
            }
        }
    }
</style>
