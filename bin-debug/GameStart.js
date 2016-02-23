var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var GameStart = (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            _super.call(this);
        }
        var d = __define,c=GameStart;p=c.prototype;
        p.onInit = function () {
            var sky = AssistFunctions.createBitmapByName("bg");
            this.addChild(sky);
            var bg = AssistFunctions.createBitmapByName("darkMask");
            bg.fillMode = egret.BitmapFillMode.SCALE;
            bg.width = this.stage.width;
            bg.height = this.stage.height;
            this.addChild(bg);
            this.start = AssistFunctions.createBitmapByName("start");
            this.start.anchorOffsetX = this.start.width / 2;
            this.start.anchorOffsetY = this.start.height / 2;
            this.start.x = this.stage.width / 2;
            this.start.y = this.stage.height / 2;
            this.start.touchEnabled = true;
            this.addChild(this.start);
            this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTouch, this);
        };
        p.onStartTouch = function (evt) {
            this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTouch, this);
            console.log("enter game now!!!!!!!!!!!!!!");
            this.dispatchEvent(new egret.Event(Balance.EventEnum.GAME_START, true, false, this));
        };
        return GameStart;
    })(Balance.DisplayObjectContainer);
    Balance.GameStart = GameStart;
    egret.registerClass(GameStart,"Balance.GameStart");
})(Balance || (Balance = {}));
