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
                <skew-layout v-if="currentProblem.rate === 1" :title="currentProblem.title" size="medium"
                             backgroundColor="#262626" fontColor="#FFFFFF" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 2" :title="currentProblem.title" size="medium"
                             backgroundColor="#262626" fontColor="#4CAF50" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 3" :title="currentProblem.title" size="medium"
                             backgroundColor="#262626" fontColor="#03A9F4" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 4" :title="currentProblem.title" size="medium"
                             backgroundColor="#262626" fontColor="#673AB7" style="margin-right: 100px"/>
                <skew-layout v-if="currentProblem.rate === 5" :title="currentProblem.title" size="medium"
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
                        <div v-if="currentProblem.formula" class="formula-title">{{currentProblem.formula}}</div>
                        <span class="content" v-html="currentProblem.content"></span>
                    </div>
                </transition>
            </div>

            <div class="test-layout" v-if="mode === 'recite'">
                <div v-for="(item, index) in totalData">
                    <skew-layout :title="item.title" size="big" backgroundColor="#141414" fontColor="#FFFFFF"
                                 style="margin-right: 43px"/>
                    <div v-for="(citem, index) in item.problems">
                        <skew-layout v-if="citem.rate === 1" :title="citem.title" size="small"
                                     backgroundColor="#141414" fontColor="#FFFFFF" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 2" :title="citem.title" size="small"
                                     backgroundColor="#141414" fontColor="#4CAF50" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 3" :title="citem.title" size="small"
                                     backgroundColor="#141414" fontColor="#03A9F4" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 4" :title="citem.title" size="small"
                                     backgroundColor="#141414" fontColor="#673AB7" style="margin-right: 100px"/>
                        <skew-layout v-if="citem.rate === 5" :title="citem.title" size="small"
                                     backgroundColor="#141414" fontColor="#FF5722" style="margin-right: 100px"/>

                        <div class="test-content-layout">
                            <div v-if="citem.formula" class="formula-title">{{citem.formula}}</div>
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
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import BaseVue from "@/core/base/BaseVue";
    import SkewLayout from "@/components/SkewLayout.vue";

    const examTitle = '企业项目管理';
    const examList = [
        {
            title: '第一章 企业项目管理概述',
            problems: [
                {
                    title: '请简述项目、大型计划与项目组合的区别与联系',
                    type: '简答',
                    rate: 1,
                    formula: '联系目标、创造基础周期',
                    content: '1. 大型计划与项目组合通常与项目是紧密联系在一起，大型计划与项目组合都是以项目为基本的组成单元，都是由一组项目构成的。\n' +
                        '2. 项目具有明确、具体的目标，大型计划是渐进明晰、抽象的战略目标，项目组合是明确的战略性目标。\n' +
                        '3. 项目是创造独特产品或服务的一次性任务；大型计划由多个项目和运作所构成；项目组合是由多个项目和大型计划构成；\n' +
                        '4. 项目是构成大型计划和项目组合的基础；构成大型计划的项目具有目标关联性；项目组合是为了管理目标的需要而把项目组织在一起。\n' +
                        '5. 项目的周期是短期的、战术性周期，大型计划具有长期的、战略性周期，项目组合的周期一般是管理周期。',
                },
                {
                    title: '简述企业希望通过项目方式来实现的目标',
                    type: '简答',
                    rate: 1,
                    content: '企业希望通过项目方式来保证：组织灵活性、管理责任的分散、对复杂问题的集中攻关、以目标为导向解决问题的过程、问题解决方案的质量和接受的可能性、个人及组织发展的机会等。企业项目管理的概念也因此由一个特定的管理领域发展为一种特定的管理范式（企业项目化管理模式）。',
                },
                {
                    title: '企业项目管理的重要性',
                    type: '简答',
                    rate: 1,
                    content: '\t1. 项目是企业发展的引擎。\n' +
                        '\t2. 项目是企业实现战略目标的主要载体。\n' +
                        '\t3. 企业的业务活动日趋项目化。\n' +
                        '\t4. 临时性组织方式是企业应对变化的重要手段。\n' +
                        '\t5. 运作是量变。\n' +
                        '\t6. 项目是质变。',
                },
                {
                    title: '项目导向型企业的特点是什么',
                    type: '简答',
                    rate: 1,
                    content: '实行项目化管理的企业通常称为“项目导向型企业（POC）”，特点是：\n' +
                        '\n' +
                        '\t1. 把“项目化管理”作为组织的战略。\n' +
                        '\t2. 采用临时性组织执行企业中等和较大规模的业务。\n' +
                        '\t3. 对不同类型的项目采用项目组合管理方法。\n' +
                        '\t4. 设置诸如项目管理办公室和项目组合管理团队这样的专门的长期性组织单元。\n' +
                        '\t5. 采用“新的管理模式”。\n' +
                        '\t6. 强烈的项目导向型企业自我认同。',
                },
                {
                    title: '企业项目管理的目的和范围',
                    type: '简答',
                    rate: 1,
                    content: '企业项目管理的目的：\n' +
                        '\n' +
                        '\t1. 管理好企业中的项目\n' +
                        '\t2. 通过项目管理好企业\n' +
                        '\n' +
                        '企业项目管理的范围：\n' +
                        '\n' +
                        '\t1. 企业项目管理是企业管理的一个特定管理领域，即与企业环境中的项目管理相关的管理领域。根据企业类型不同，企业项目管理体系可以是一个企业管理体系的分系统，也可以是一个企业管理系统的全部。\n' +
                        '\t2. 企业项目管理的企业管理的一种特定管理模式，即指项目导向型的企业管理模式，也称为企业项目化管理模式。',
                },
                {
                    title: '广义的企业项目管理和狭义的企业项目管理的内涵',
                    type: '简答',
                    rate: 1,
                    content:
                        '\t1. 广义的企业项目管理是指企业环境中的项目管理，包括经典项目管理和战略项目管理，是企业管理的一个特定领域。\n' +
                        '\t2. 狭义的企业项目管理是指企业项目化管理（MBP）或项目导向型的企业管理；即将项目作为一种临时性的组织方式，运用现代项目管理方法管理项目，从而通过项目实现企业战略；是企业项目管理的一个特定模式。',
                },
            ],
        },
        {
            title: '第二章 企业项目管理体系',
            problems: [
                {
                    title: '请简述基于企业管理视角，企业项目管理对企业环境中项目的管理任务',
                    type: '简答',
                    rate: 1,
                    content:
                        '\t1. 基于战略目标导向处理好项目目标与战略目标的关系\n' +
                        '\t2. 基于战略目标导向处理好项目与其他项目之间的关系\n' +
                        '\t3. 选择适当的组织方式组织资源实现项目的目标\n' +
                        '\t4. 处理好项目层面管理与企业层面管理之间的关系\n' +
                        '\t5. 处理好项目管理与职能管理之间的关系',
                },
                {
                    title: '企业项目管理的基本职能和关键领域是什么',
                    type: '简答',
                    rate: 1,
                    formula: '选治组，计控持 / 站收利滋风纪',
                    content:
                        '<h3>基本职能：</h3>' +
                        '\t1. <b>选</b>择\n' +
                        '\t2. <b>治</b>理\n' +
                        '\t3. <b>组</b>织\n' +
                        '\t4. <b>计</b>划\n' +
                        '\t5. <b>控</b>制\n' +
                        '\t6. 支<b>持</b>\n' +
                        '<h3>关键领域：</h3>' +
                        '\t1. <b>战</b>略管理\n' +
                        '\t2. <b>收</b>益管理\n' +
                        '\t3. <b>利</b>益相关者管理\n' +
                        '\t4. <b>资</b>源管理\n' +
                        '\t5. <b>风</b>险管理\n' +
                        '\t6. <b>绩</b>效管理',
                },
                {
                    title: '简述收益管理的主要活动 / 请简述企业项目管理的关键领域中收益管理的基本过程包含的主要活动',
                    type: '简答',
                    rate: 1,
                    formula: '姑父别吃鸡',
                    content:
                        '\t1. 管理和评估收益\n' +
                        '\t2. 收益的交付\n' +
                        '\t3. 收益识别\n' +
                        '\t4. 收益的维持\n' +
                        '\t5. 制定收益计划',
                },
                {
                    title: '简述在企业项目管理中，绩效管理的应用',
                    type: '简答',
                    rate: 1,
                    content:
                        '\t* 企业绩效管理\n' +
                        '\t* 大型计划绩效管理\n' +
                        '\t* 项目绩效管理\n' +
                        '\t* 项目组合绩效管理',
                },
                {
                    title: '简述在企业项目管理中风险管理的应用',
                    type: '简答',
                    rate: 1,
                    content:
                        '\t1. 项目风险管理是指在对项目风险进行计划、识别、分析和评价框架的支持下，对项目风险应对策略做出科学的决策，同时在实施过程中进行有效监督和控制的系统过程。\n' +
                        '\t2. 大型计划风险管理是指对大型计划风险进行计划、识别、分析、规划应对并监控的过程。\n' +
                        '\t3. 项目组合风险管理是指对项目组合风险进行计划、识别、分析、规划应对并监控的过程。',
                },
                {
                    title: '简述风险管理的主要活动',
                    type: '简答',
                    rate: 1,
                    formula: '试管估计被监控',
                    content:
                        '\t1. 风险识别\n' +
                        '\t2. 风险管理规划\n' +
                        '\t3. 风险评估\n' +
                        '\t4. 风险应对计划\n' +
                        '\t5. 风险监控',
                },
                {
                    title: '简述利益相关者管理的主要活动',
                    type: '简答',
                    rate: 1,
                    content:
                        '1. 识别利益相关者\n' +
                        '2. 制定利益相关者参与计划\n' +
                        '3. 促进利益相关者的参与\n' +
                        '4. 跟踪与调整利益相关者参与',
                },
                {
                    title: '请简述企业项目管理的关键领域中战略管理的主要内容和主要方法',
                    type: '简答',
                    rate: 1,
                    formula: '十分指控 / 三矩一卡',
                    content: '战略管理的主要内容：\n' +
                        '\t1. 战略实施\n' +
                        '\t2. 战略分析\n' +
                        '\t3. 战略制定\n' +
                        '\t4. 战略控制\n' +
                        '\n' +
                        '战略管理的主要方法：\n' +
                        '\t1. Ansoff 矩阵分析法\n' +
                        '\t2. 波士顿矩阵法\n' +
                        '\t3. 内部因素评价矩阵分析法\n' +
                        '\t4. 平衡积分卡',
                },
                {
                    title: '简述企业项目管理知识体系的内容',
                    type: '简答',
                    rate: 1,
                    content:
                        '1. 企业项目相关的基本术语\n' +
                        '2. 企业项目管理的基本过程\n' +
                        '3. 企业项目管理的方法、技术和工具等\n' +
                        '4. 企业项目管理相关的经验教训与数据积累',
                },
                {
                    title: '企业项目管理知识体系的开发原则',
                    type: '简答',
                    rate: 1,
                    formula: '一面便可知',
                    content:
                        '\t1. 一致性与独特性相结合原则\n' +
                        '\t2. 面向使用对象的原则\n' +
                        '\t3. 便于积累的原则\n' +
                        '\t4. 可视化原则\n' +
                        '\t5. 兼顾知识体系完整性和开放性的原则',
                },
                {
                    title: '企业项目化管理的三种主要方法',
                    type: '简答',
                    rate: 1,
                    content:
                        '1. 项目界面管理（PIM）\n' +
                        '2. 大型计划管理（PgM）\n' +
                        '3. 项目组合管理（PfM）',
                },
                {
                    title: '项目化管理组织结构设计应遵循的原则',
                    type: '简答',
                    rate: 1,
                    formula: '中权有集，军事分工',
                    content:
                        '\t1. <b>以项目为中心</b>\n' +
                        '\t2. <b>权责对等</b>\n' +
                        '\t3. 有效的<b>管理层次</b>和<b>管理幅度</b>\n' +
                        '\t4. <b>集权</b>与<b>分权</b>相结合的原则\n' +
                        '\t5. <b>均衡性原则</b>\n' +
                        '\t6. <b>环境适应性原则</b>\n' +
                        '\t7. <b>分工协作，目标导向</b>',
                },
                {
                    title: '职能式、项目式、矩阵式三种项目组织的优缺点',
                    type: '简答',
                    rate: 1,
                    content:
                        '<h3>职能式：</h3>' +
                        '\t优点：\n' +
                        '\t\t1. 资源利用的灵活性大\n' +
                        '\t\t2. 有利于组织技术水平的提升\n' +
                        '\t\t3. 有利于组织的控制\n' +
                        '\t\t4. 有利于组织的稳定性\n' +
                        '\t缺点：\n' +
                        '\t\t1. 协调难度大\n' +
                        '\t\t2. 对环境适应性差\n' +
                        '\t\t3. 项目组织成员责任淡化\n' +
                        '\t使用条件：\n' +
                        '\t\t1. 规模较小的、以技术为重点的项目\n' +
                        '<h3>项目式：</h3>' +
                        '\t优点：\n' +
                        '\t\t1. 目标明确及统一指挥\n' +
                        '\t\t2. 有利于项目的控制\n' +
                        '\t\t3. 适宜不确定性环境中的快速变化\n' +
                        '\t缺点：\n' +
                        '\t\t1. 机构重复及资源闲置\n' +
                        '\t\t2. 不利于组织专业技术水平的提高\n' +
                        '\t\t3. 不稳定性\n' +
                        '\t使用条件：\n' +
                        '\t\t1. 包含多个相似项目的单位或组织以及长期的、大型的、重要的和复杂的项目\n' +
                        '<h3>矩阵式：</h3>' +
                        '\t优点：\n' +
                        '\t\t1. 有利于加强各职能部门之间的协作配合\n' +
                        '\t\t2. 有利于资源的灵活利用，提高组织的适应性\n' +
                        '\t\t3. 具有职能组织和项目组织的双重优点，保证组织整体目标的实现\n' +
                        '\t缺点：\n' +
                        '\t\t1. 组织的稳定性较差\n' +
                        '\t\t2. 双重领导的存在，容易产生责任不清、多头指挥的混乱现象\n' +
                        '\t\t3. 多项目间的冲突难以平衡\n' +
                        '\t使用条件：\n' +
                        '\t\t1. 需要利用多个职能部门的资源而且技术相对复杂，但又不需要技术人员全职为项目工作的项目，特别是当几个项目需要同时共享某些技术人员时\n',
                },
                {
                    title: '项目化管理组织结构设计应遵循的原则',
                    type: '简答',
                    rate: 1,
                    formula: '选配即狗官',
                    content:
                        '\t1. <b>项目选择</b>与<b>决策</b>机制\n' +
                        '\t2. <b>资源配置</b>与<b>整合</b>机制\n' +
                        '\t3. <b>绩效考评</b>与<b>激励</b>机制\n' +
                        '\t4. <b>信息沟通</b>与<b>知识积累</b>机制\n' +
                        '\t5. <b>项目管理能力持续改进</b>机制',
                },
                {
                    title: '组织的绩效考评的定义和目的',
                    type: '简答',
                    rate: 1,
                    content: '组织的绩效考评是指<b>评价主体</b>利用其所<b>掌握的信息</b>对<b>评价客体</b>运用一定的<b>方法、程序、指标</b>等进行分析，进而对评价客体在<b>一定时期内</b>的<b>行' +
                        '为、表现</b>作出某种<b>判断的过程</b>。其目的在于通过<b>考评</b>对<b>组织</b>和<b>个人</b>的<b>行为</b>产生<b>导向</b>和<b>牵引</b>作用，从而<b>保持</b>和<b>修正组织</b>和<b>个人</b>的<b>活动</b>以保证<b>组织战略目标' +
                        '的实现</b>',
                },
                {
                    title: '适用于项目经理的激励方法有哪些',
                    type: '简答',
                    rate: 1,
                    formula: '瘦子坚持，积木见风',
                    content:
                        '\t1. <b>授权</b>\n' +
                        '\t2. <b>自我激励</b>\n' +
                        '\t3. <b>建立规范的组织晋升机制</b>\n' +
                        '\t4. <b>持股计划</b>\n' +
                        '\t5. <b>激励契约</b>\n' +
                        '\t6. <b>目标激励</b>\n' +
                        '\t7. <b>建立行为约束机制</b>\n' +
                        '\t8. <b>风险激励</b>',
                },
                {
                    title: '使用于组织成员的激励方法有哪些',
                    type: '简答',
                    rate: 1,
                    formula: '新增支付，实行赔赚',
                    content:
                        '\t1. <b>薪酬激励</b>\n' +
                        '\t2. 增强<b>组织成员</b>的<b>自豪感</b>与<b>责任心</b>\n' +
                        '\t3. 为其进行<b>职业设计</b>\n' +
                        '\t4. <b>赋予</b>组织成员<b>自治权</b>\n' +
                        '\t5. 实行<b>群体环境激励</b>\n' +
                        '\t6. 为组织成员提供参加<b>培训</b>与<b>学习</b>的机会\n' +
                        '\t7. <b>专业上的认可</b>',
                }],
        },
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
    @import "../assets/css/color";

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
        }

        .toolbar-layout .sub-title {
            font-size: 12px;
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
            margin-right: 130px;
            /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
        }

        .content-layout .content {
            white-space: pre-line;
            color: $app-color;
            // text-shadow: 1px 0 2px #00aa00, 0 1px 2px #00aa00, 0 -1px 2px #00aa00, -1px 0 2px #00aa00;
        }


        .formula-title {
            padding: 8px 12px;
            text-align: left;
            color: #ffffff;
            background-color: #00695c;
            margin-bottom: 32px;
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

        .test-content-layout {
            display: flex;
            flex-direction: column;
            padding: 16px;
            margin-top: 1.5px;
            margin-bottom: 16px;
            background-color: rgba(38, 38, 38, 0.99);
            margin-right: 125px;

            .content {
                white-space: pre-line;
                color: $app-color;
            }

            .formula-title {
                padding: 8px 12px;
                text-align: left;
                color: #ffffff;
                background-color: #00695C;
                margin-bottom: 16px;
            }

        }
    }
</style>
