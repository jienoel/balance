var Balance;
(function (Balance) {
    /**
     *
     * @author
     *
     */
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.call(this);
            if (this.stage) {
                this.init();
            }
            else {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            }
        }
        var d = __define,c=DisplayObjectContainer;p=c.prototype;
        p.addToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.init();
            this.onAddToStage(event);
        };
        p.onAddToStage = function (event) {
        };
        p.init = function () {
            this.onInit();
        };
        p.onInit = function () {
        };
        return DisplayObjectContainer;
    })(egret.DisplayObjectContainer);
    Balance.DisplayObjectContainer = DisplayObjectContainer;
    egret.registerClass(DisplayObjectContainer,"Balance.DisplayObjectContainer");
})(Balance || (Balance = {}));
//# sourceMappingURL=DisplayObjectContainer.js.map