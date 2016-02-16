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
        var scene = new Balance.SceneContainer();
        scene.name = "scene";
        this.addChild(scene);
        scene.addEventListener("sceneClick", this.onSceneClick, this);
        this.seesaw = AssistFunctions.createBitmapByName("seesaw");
        this.seesaw.anchorOffsetX = this.seesaw.width / 2;
        scene.addChild(this.seesaw);
        this.seesaw.x = 530;
        this.seesaw.y = 385;
        this.princess = new Balance.Role(Balance.playerEnum.ROLE_PRINCESS);
        this.princess.addToStage(scene);
        this.princess.x = 81;
        this.princess.y = 300;
        console.log("seesaw location:" + this.seesaw.x + "," + this.seesaw.y);
    };
    p.onSceneClick = function (evt) {
        var e = evt.data;
        //   this.seesaw.x = e.localX;
        //   this.seesaw.y = e.localY;
        var left = e.localX <= this.princess.x ? true : false;
        this.princess.move(left);
        console.log("touching......" + this.princess.x + "   " + this.princess.y);
    };
    return GameStart;
})(Balance.DisplayObjectContainer);
egret.registerClass(GameStart,"GameStart");
//# sourceMappingURL=GameStart.js.map