<template>
    <div class="main-base-layout">

        <div class="base-layout">
            <div class="toolbar-layout">
                <div class="left-layout">
                    <span class="title">{{htmlTitle}}</span>
                    <span class="sub-title">当前共有 {{ totalChapterNumber }} 章，共 {{ totalProblemNumber }} 题</span>
                </div>
                <div class="right-layout">
                    <el-select size="small" v-model="currentSelectChapterIndex" v-on:change="onChangeSelect">
                        <el-option v-for="item in allChapterList" :key="item.index" :label="item.value"
                                   :value="item.index">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="question-layout" v-if="mode === 'test'">
                <skew-layout v-if="currentProblem.rate === 1" :title="currentProblem.title" size="big"
                             backgroundColor="#262626" fontColor="#FFFFFF" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 2" :title="currentProblem.title" size="big"
                             backgroundColor="#262626" fontColor="#4CAF50" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 3" :title="currentProblem.title" size="big"
                             backgroundColor="#262626" fontColor="#03A9F4" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 4" :title="currentProblem.title" size="big"
                             backgroundColor="#262626" fontColor="#673AB7" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 5" :title="currentProblem.title" size="big"
                             backgroundColor="#262626" fontColor="#FF5722" style="margin-right: 100px"/>

                <div class="btn-layout">
                    <skew-layout title="认识" size="mini" backgroundColor="#262626" fontColor="#FFFFFF"
                                 width="150" textAlign="center" style="margin-top: 2px;"
                                 v-on:click="onClickKnow(currentProblem)"/>
                    <skew-layout title="忘记" size="mini" backgroundColor="#262626" fontColor="#FFFFFF"
                                 :leftAngle="false" width="150" textAlign="center"
                                 style="margin-left: -37px; margin-top: 2px;"
                                 v-on:click="onClickNotKnow(currentProblem)"/>
                    <skew-layout title="查看答案" size="mini" backgroundColor="#262626" fontColor="#FFFFFF"
                                 :leftAngle="false" width="150" textAlign="center"
                                 style="margin-left: -37px; margin-top: 2px;"
                                 v-on:click="onClickAnswer"/>
                </div>
                <transition name="el-zoom-in-top">
                    <div class="content-layout" v-if="isShowAnswer">
                        <div class="formula-title">{{currentProblem.formula}}</div>
                        <span class="content" v-html="currentProblem.content"></span>
                    </div>
                </transition>
            </div>

            <div class="test-layout" v-if="mode === 'recite'">
                <div v-for="(item, index) in totalData" style="color: #ffffff;">
                    <div v-for="(citem, index) in item.problems">
                        <skew-layout v-if="citem.rate === 1" :title="currentProblem.title" size="big"
                                     backgroundColor="#262626" fontColor="#FFFFFF" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 2" :title="currentProblem.title" size="big"
                                     backgroundColor="#262626" fontColor="#4CAF50" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 3" :title="currentProblem.title" size="big"
                                     backgroundColor="#262626" fontColor="#03A9F4" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 4" :title="currentProblem.title" size="big"
                                     backgroundColor="#262626" fontColor="#673AB7" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 5" :title="currentProblem.title" size="big"
                                     backgroundColor="#262626" fontColor="#FF5722" style="margin-right: 100px"/>

                        <div class="content-layout">
                            <div class="formula-title">{{citem.formula}}</div>
                            <span class="content" v-html="citem.content"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="float-layout">
            <div @click="onClickTestMode">测验模式</div>
            <div @click="onClickReciteMode">背题模式</div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import BaseVue from "@/core/base/BaseVue";
    import SkewLayout from "@/components/SkewLayout.vue";

    const examTitle = 'PROJECT MANAGEMENT';
    const examList = [
        {
            title: 'WEB_QUESTION',
            problems: [
                {
                    title: 'FIRST WEB_QUESTION',
                    type: 'ANSWER',
                    rate: 5,
                    formula: '小型结果',
                    content:
                        '1. ONE\n' +
                        '2. TWO\n'
                }
            ]
        }
    ];

    const TAG = "Index";
    @Component({
        name: "Index",
        components: {SkewLayout}
    })
    export default class Index extends BaseVue {
        public colors: any = {
            1: '#BDBDBD',
            2: '#4CAF50',
            3: '#03A9F4',
            4: '#673AB7',
            5: '#FF5722',
        };
        public htmlTitle: string = examTitle;
        public totalData: Array<any> = examList;
        public allChapterList: Array<any> = [];
        public selectProblemsData: Array<any> = [];
        public isBigModel: boolean = false;

        public currentProblem: any = {
            title: '',
            type: '',
            content: '',
            rate: 0,
            index: 0,
            formula: '',
        };

        /** 学习模式：recite, test */
        public mode: string = 'test';

        public currentSelectChapterIndex: number = 0;
        public totalChapterNumber: number = 0;
        public totalProblemNumber: number = 0;
        public isShowAnswer: boolean = false;

        onCreated(): void {
            this.allChapterList = [];
            this.allChapterList.push({
                value: '全部',
                index: 0,
            });
            this.totalData.forEach((v, i) => {
                this.totalProblemNumber += v.problems.length;
                this.allChapterList.push({
                    value: v.title,
                    index: i + 1,
                });
            });
            this.totalChapterNumber = this.totalData.length;
            this.__updateSelectOptionData();
        }

        public onClickModel(): void {
            this.isBigModel = !this.isBigModel;
        }

        public onClickKnow(problem: any): void {
            this.selectProblemsData[problem.index].isWill = true;
            this.__nextProblem();
        };

        public onClickNotKnow(problem: any): void {
            this.selectProblemsData[problem.index].isWill = false;
            this.__nextProblem();
        }

        public onClickAnswer(): void {
            this.isShowAnswer = !this.isShowAnswer;
        }

        public onChangeSelect(data: any): void {
            this.__updateSelectOptionData();
        }

        public onClickReciteMode(): void {
            this.mode = 'recite';
        }

        public onClickTestMode(): void {
            this.mode = 'test';
        }

        public __updateSelectOptionData(): void {
            this.selectProblemsData = [];
            let problems = this.selectProblemsData;
            if (this.currentSelectChapterIndex === 0) {
                this.totalData.forEach((v) => problems = problems.concat(v.problems));
            } else {
                problems = this.totalData[Number(this.currentSelectChapterIndex) - 1].problems;
            }
            problems.forEach((v, i) => {
                v.index = i;
                v.isWill = false;
            });
            this.selectProblemsData = problems;
            this.__nextProblem();
        }

        public __nextProblem(): void {
            this.__updateCurrentProblem(this.currentProblem, this.__randomProblem(this
                .selectProblemsData));
            this.isShowAnswer = false;
        }

        public __randomProblem(problem: any): any {
            let isAllWill = true;
            problem.forEach((v: any) => {
                if (!v.isWill) isAllWill = false;
            });
            if (isAllWill) {
                return {
                    title: '全部完成！',
                    type: '',
                    content: '',
                    index: 0,
                };
            }
            let randomIndex = Math.floor(Math.random() * problem.length);
            if (problem[randomIndex].isWill) {
                return this.__randomProblem(problem);
            } else {
                return problem[randomIndex];
            }
        }

        public __updateCurrentProblem(currentProblem: any, selectProblem: any): void {
            currentProblem.title = selectProblem.title;
            currentProblem.type = selectProblem.type;
            currentProblem.content = selectProblem.content;
            currentProblem.index = selectProblem.index;
            currentProblem.rate = selectProblem.rate || 1;
            currentProblem.formula = selectProblem.formula;
        }
    }
</script>

<style lang="scss">
    .main-base-layout {
        display: flex;
        flex-direction: column;

        .base-layout {
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .toolbar-layout {
            display: flex;
            flex-direction: row;
            padding: 8px 16px;
            align-items: center;
            justify-content: center;
            /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
            background-color: #262626;
            margin-bottom: 1.5px;
        }

        .toolbar-layout .left-layout {
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .toolbar-layout .right-layout {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .toolbar-layout .title {
            font-size: 20px;
            color: white;
        }

        .toolbar-layout .sub-title {
            font-size: 12px;
            color: white;
        }

        .question-layout {
            display: flex;
            flex-direction: column;
            /*padding: 16px 16px;*/
        }

        .question-layout .tag-layout {
            display: flex;
            flex-direction: row;
            margin-top: 8px;
        }

        .question-layout .tag-layout .tag-title {
            font-size: 12px;
        }

        .question-layout .btn-layout {
            display: flex;
            flex-direction: row;
        }

        .content-layout {
            display: flex;
            flex-direction: column;
            padding: 32px;
            margin: 32px;
            background-color: #262626;
            /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
        }

        .content-layout .content {
            white-space: pre-line;
            color: white;
            margin-top: 32px;
        }


        .formula-title {
            padding: 8px 12px;
            text-align: left;
            color: #ffffff;
            background-color: #00695C;
        }

        .float-layout {
            position: fixed;
            top: 150px;
            right: 0;
            display: flex;
            flex-direction: column;
            color: white;
            padding: 16px;
        }
    }
</style>
