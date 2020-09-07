/**
 * 点击双击点击器
 */
import Logger from "@/core/Logger";

const TAG = "DoubleClickManager";

export default class DoubleClickManager {
    // 点击间隔 sm
    public clickIntervalSM: number = 200;
    public isClick: boolean = false;
    public clickCount: number = 0;

    public clearInterval !: any;

    public click() {
        this.clickCount++;
        if (!this.isClick) {
            this.isClick = true;
        }
        if (!this.clearInterval) {
            this.startTimer();
        }
    }

    public startTimer(): void {
        this.clearInterval = setInterval(() => {
            if (this.clickCount === 1) {
                if (this.clickListener) {
                    this.clickListener();
                }
            } else {
                if (this.clickDoubleListener) {
                    this.clickDoubleListener();
                }
            }
            this.stopTimer();
        }, this.clickIntervalSM);
    }

    public stopTimer(): void {
        clearInterval(this.clearInterval);
        this.clearInterval = null;
        this.clickCount = 0;
    }

    private clickListener!: () => void;
    private clickDoubleListener!: () => void;

    public setClickListener(listener: () => void): void {
        this.clickListener = listener;
    }

    public setDoubleClickListener(listener: () => void): void {
        this.clickDoubleListener = listener;
    }
}
