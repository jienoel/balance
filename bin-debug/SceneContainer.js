var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var SceneContainer = (function (_super) {
        __extends(SceneContainer, _super);
        function SceneContainer() {
            _super.call(this);
        }
        var d = __define,c=SceneContainer;p=c.prototype;
        p.onInit = function () {
            var sky = AssistFunctions.createBitmapByName("bg");
            this.addChild(sky);
            sky.touchEnabled = true;
            sky.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkyTouch, this);
        };
        p.onSkyTouch = function (evt) {
            this.dispatchEvent(new egret.Event("sceneClick", false, true, evt));
        };
        return SceneContainer;
    })(Balance.DisplayObjectContainer);
    Balance.SceneContainer = SceneContainer;
    egret.registerClass(SceneContainer,"Balance.SceneContainer");
})(Balance || (Balance = {}));
//# sourceMappingURL=SceneContainer.js.map