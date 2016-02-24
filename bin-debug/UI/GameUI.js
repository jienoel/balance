var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var GameUI = (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            _super.call(this);
            //controller
            this._state = Balance.GameStatusEnum.INIT;
        }
        var d = __define,c=GameUI;p=c.prototype;
        d(p, "totalTime",undefined
            ,function (total) {
                this._totalTime = total;
                this._count = total;
            }
        );
        d(p, "leftTime"
            ,function () {
                return this._count;
            }
        );
        d(p, "state",undefined
            ,function (s) {
                if (this._state != s && this._state != Balance.GameStatusEnum.INIT) {
                    this.removeChildren();
                    if (this._state == Balance.GameStatusEnum.RUNNING) {
                        this.destroyRunningUI();
                    }
                }
                this._state = s;
                if (this._state == Balance.GameStatusEnum.RUNNING) {
                    this.createRunningUI();
                }
            }
        );
        p.onInit = function () {
            this._bitmapFont = RES.getRes("font_fnt");
        };
        //Running
        p.createRunningUI = function () {
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
            this._timer = new egret.Timer(1000, this._totalTime);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onRunningTimerEvent, this);
            this._timer.start();
        };
        p.onRunningTimerEvent = function (evt) {
            this._count--;
            this._timeText.text = this._count.toString();
            if (this._count <= 0) {
                this._count = 0;
                this.dispatchEvent(new egret.Event(Balance.EventEnum.TIME_OVER, true, false, null));
            }
        };
        p.updateStarText = function (starTake, starCount) {
            if (this._starText == null)
                return;
            this.starTaken = starTake;
            this._starText.text = starTake + "-" + starCount;
            this._starText.x = this.stage.stageWidth - this._starText.width - 40;
        };
        p.destroyRunningUI = function () {
            this._timeText = null;
            this._starText = null;
        };
        p.onRemove = function () {
            if (this._timer != null) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onRunningTimerEvent, this);
            }
        };
        return GameUI;
    })(Balance.DisplayObjectContainer);
    Balance.GameUI = GameUI;
    egret.registerClass(GameUI,"Balance.GameUI");
})(Balance || (Balance = {}));
//# sourceMappingURL=GameUI.js.map