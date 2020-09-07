class TSLintRules {
    public static PUBLIC_FIELD: string = "";
    protected static PUBLIC_FIELD2: string = "";
    private static PUBLIC_FIELD3: string = "";

    public peoplePub = "";
    public anyTest: string = "";

    protected peoplePro: string = "";
    private peoplePri: string = "";

    public foo(_a: number, ..._rest: Array<any>): void {
        return;
    }

    public doWork(): void {
    }

}


let na2me: TSLintRules = new TSLintRules();

for (let item of Object.keys(na2me)) {

}

function foo(instance: TSLintRules | undefined):void {
    // if (instance !== undefined) {
    //     instance.doWork();
    // }
    // instance!.doWork();
}
