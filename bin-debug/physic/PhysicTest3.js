var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var PhysicTest3 = (function (_super) {
        __extends(PhysicTest3, _super);
        function PhysicTest3() {
            _super.call(this);
        }
        var d = __define,c=PhysicTest3;p=c.prototype;
        p.onInit = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.createWorld();
            this.createGround();
            this.createDebug();
        };
        p.enterFrame = function () {
            this._world.step(60 / 1000);
            this.debugDraw.drawDebug();
        };
        p.createWorld = function () {
            var wrd = new p2.World();
            wrd.gravity = [0, -10];
            this._world = wrd;
        };
        p.createGround = function () {
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var groundShape = new p2.Plane();
            var groundBody = new p2.Body({ mass: 0 });
            groundBody.position[1] = stageHeight - 100;
            groundBody.angle = Math.PI;
            groundBody.addShape(groundShape);
            this._world.addBody(groundBody);
            console.log("create ground! " + groundBody.position[0] + ":" + groundBody.position[1] + "   / " + stageHeight);
        };
        p.createDebug = function () {
            var sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        };
        return PhysicTest3;
    })(Balance.DisplayObjectContainer);
    Balance.PhysicTest3 = PhysicTest3;
    egret.registerClass(PhysicTest3,"Balance.PhysicTest3");
})(Balance || (Balance = {}));
//# sourceMappingURL=PhysicTest3.js.map