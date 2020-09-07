import CaseListEntity from "../src/entity/case/CaseListEntity";
import PagesEntity from "../src/entity/PagesEntity";
import CaseDetailsEntity from "../src/entity/case/CaseDetailsEntity";
import CaseMediationAmountEntity from "../src/entity/case/CaseMediationAmountEntity";
import CaseRepaymentAgreeEntity from "../src/entity/case/CaseRepaymentAgreeEntity";
import MediationRecordListEntity from "../src/entity/case/MediationRecordListEntity";

export default class TestData {
    public static getMediationCaseList(): PagesEntity<CaseListEntity> {
        let page = new PagesEntity<CaseListEntity>();
        page.page = 1;
        page.size = 20;
        page.totalPages = 1;
        page.totalElements = 10;
        page.pageData = new Array<CaseListEntity>();
        {
            let e = new CaseListEntity();
            e.gmtCreated = "2020-01-01";
            e.deadlineDate = "2020-01-01";
            e.deadlineRemainDay = "32";
            e.source = "测试测试";
            e.disputes = "1";
            e.status = "20";
            e.litigantList = new Array();
            e.litigantList.push("厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            page.pageData.push(e);
        }
        {
            let e = new CaseListEntity();
            e.gmtCreated = "2020-01-01";
            e.deadlineDate = "2020-01-01";
            e.deadlineRemainDay = "32";
            e.source = "测试测试";
            e.disputes = "1";
            e.status = "20";
            e.litigantList = new Array();
            e.litigantList.push("厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            page.pageData.push(e);
        }
        {
            let e = new CaseListEntity();
            e.gmtCreated = "2020-01-01";
            e.deadlineDate = "2020-01-01";
            e.deadlineRemainDay = "32";
            e.source = "测试测试";
            e.disputes = "1";
            e.status = "20";
            e.litigantList = new Array();
            e.litigantList.push("厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            e.litigantList.push("厦门法院厦门法院厦门法院");
            page.pageData.push(e);
        }
        return page;
    }

    public static getCaseDetails(): CaseDetailsEntity {
        let data = new CaseDetailsEntity();
        data.id = "183857942692388481";
        data.no = "JG848018248081323137";
        data.disputes = "1";
        data.name = "某县人民法院";
        data.court = "某县人民法院(court)";
        let mediationAmount = new CaseMediationAmountEntity();
        mediationAmount.principal = "10000";
        mediationAmount.interest = "99999";
        mediationAmount.manageFee = "12399";
        data.mediationAmount = mediationAmount;
        data.actualAmount = "1000";
        data.summary = "summary summary summary summary summary summary";
        data.programme = "调解方案";
        data.monthPenaltyInterest = "100";
        let repaymentAgree = new Array<CaseRepaymentAgreeEntity>();
        repaymentAgree.push({ term: "1", paymentDate: "2020-01-01", paymentAmount: "100" });
        repaymentAgree.push({ term: "2", paymentDate: "2020-02-02", paymentAmount: "200" });
        data.litigantList = new Array();
        data.litigantList.push("厦门法院");
        data.litigantList.push("厦门法院厦门法院厦门法院");
        data.litigantList.push("厦门法院厦门法院厦门法院");
        data.litigantList.push("厦门法院厦门法院厦门法院");
        data.litigantList.push("厦门法院厦门法院厦门法院");
        data.repaymentAgrees = repaymentAgree;
        return data;
    }

    public static getMediationRecordList(): Array<MediationRecordListEntity> {
        let array = new Array<MediationRecordListEntity>();

        // array.push({
        //     "userName": "安定",
        //     "content": "阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿",
        //     "top": "0",
        //     "type": "1",
        //     "gmtCreated": "2020-05-08 10:23:00"
        // })
        // array.push({
        //     "userName": "安定",
        //     "content": "阿斯顿",
        //     "top": "0",
        //     "type": "1",
        //     "gmtCreated": "2020-05-08 10:23:10"
        // })

        return array;
    }
}