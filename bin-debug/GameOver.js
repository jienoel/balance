var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver(isWin) {
            _super.call(this);
            this._isWin = isWin;
        }
        var d = __define,c=GameOver;p=c.prototype;
        p.onInit = function () {
            var sky = AssistFunctions.createBitmapByName("bg");
            this.addChild(sky);
            this.darkMask = AssistFunctions.createBitmapByName("darkMask");
            this.darkMask.fillMode = egret.BitmapFillMode.SCALE;
            this.darkMask.width = this.stage.width;
            this.darkMask.height = this.stage.height;
            this.addChild(this.darkMask);
            if (this._isWin) {
                this.result = AssistFunctions.createBitmapByName("win");
            }
            else {
                this.result = AssistFunctions.createBitmapByName("fail");
            }
            this.result.anchorOffsetX = this.result.width / 2;
            this.result.anchorOffsetY = this.result.height / 2;
            this.result.x = this.stage.width / 2;
            this.result.y = this.stage.height / 2;
            this.result.touchEnabled = true;
            this.addChild(this.result);
            this.result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResultTouch, this);
        };
        p.onResultTouch = function (evt) {
            this.result.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onResultTouch, this);
            console.log("on result touch!   " + this._isWin);
            this.dispatchEvent(new egret.Event(Balance.EventEnum.GAME_RESTART, true, false, evt));
        };
        return GameOver;
    })(Balance.DisplayObjectContainer);
    Balance.GameOver = GameOver;
    egret.registerClass(GameOver,"Balance.GameOver");
})(Balance || (Balance = {}));
