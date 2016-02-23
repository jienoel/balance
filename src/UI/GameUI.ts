module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
    export class GameUI extends DisplayObjectContainer {
        // running UI
        private _bitmapFont: egret.BitmapFont;
        private _timeText: egret.BitmapText;
        private _starText: egret.BitmapText;
        private _timer: egret.Timer;
        public starTaken: number;
        public set totalTime(total: number) {
            this._totalTime = total;
            this._count = total;
        }
        private _totalTime: number;
        private _count: number;
        //controller
        private _state: GameStatusEnum = GameStatusEnum.INIT;
        public set state(s: GameStatusEnum) {
            if(this._state != s && this._state != GameStatusEnum.INIT) {
                this.removeChildren();
                if(this._state == GameStatusEnum.RUNNING) {
                    this.destroyRunningUI();
                }
            }
            this._state = s;
            if(this._state == GameStatusEnum.RUNNING) {
                this.createRunningUI();
            }
        }
        public constructor() {
            super();
        }

        public onInit(): void {
            this._bitmapFont = RES.getRes("font_fnt");
        }
        
        //Running
        private createRunningUI(): void {
            this._starText = new egret.BitmapText();
            this._starText.font = this._bitmapFont;
            this._starText.anchorOffsetX = this._starText.width / 2;
            this._starText.anchorOffsetY = this._starText.height / 2;
            //            this._starText.x = this.stage.stageWidth - this._starText.width  - 300;
            this._starText.y = 30;
            this.addChild(this._starText);

            this._timeText = new egret.BitmapText();
            this._timeText.font = this._bitmapFont;
            this._timeText.anchorOffsetX = this._timeText.width / 2;
            this._timeText.anchorOffsetY = this._timeText.height / 2;
            this._timeText.x = this.stage.stageWidth / 2;
            this._timeText.y = this.stage.stageHeight * 0.2;
            this.addChild(this._timeText);
            this._timer = new egret.Timer(1000,this._totalTime);
            this._timer.addEventListener(egret.TimerEvent.TIMER,this.onRunningTimerEvent,this);
            this._timer.start();
        }

        private onRunningTimerEvent(evt: egret.TimerEvent): void {
            this._count--;
            this._timeText.text = this._count.toString();
        }

        public updateStarText(starTake: number,starCount: number): void {
            if(this._starText == null)
                return;
            this.starTaken = starTake;
            this._starText.text = starTake + "-" + starCount;
            this._starText.x = this.stage.stageWidth - this._starText.width - 40;
        }

        private destroyRunningUI(): void {
            this._timeText = null;
            this._starText = null;
        }

        public destroy(): void
        { 
            if(this._timer != null)
            { 
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER,this.onRunningTimerEvent,this);
            }
        }
	}
}
