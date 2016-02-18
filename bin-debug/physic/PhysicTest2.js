var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var PhysicTest2 = (function (_super) {
        __extends(PhysicTest2, _super);
        function PhysicTest2() {
            _super.call(this);
            this._factor = 50;
        }
        var d = __define,c=PhysicTest2;p=c.prototype;
        p.onInit = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
            this.createWorld();
            this.createGround();
            this.createBodies();
            this.createDebug();
        };
        p.createWorld = function () {
            var wrd = new p2.World();
            wrd.sleepMode = p2.World.BODY_SLEEPING;
            wrd.gravity = [0, 10];
            this._world = wrd;
        };
        p.createGround = function () {
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var groundShape = new p2.Plane();
            var groundBody = new p2.Body();
            groundBody.position[0] = 400;
            groundBody.position[1] = stageHeight - 200;
            groundBody.angle = Math.PI;
            groundBody.addShape(groundShape);
            this._world.addBody(groundBody);
        };
        p.createBodies = function () {
            var boxShape = new p2.Box({ 50000: 25000 });
            var boxBody = new p2.Body({ mass: 1, position: [200, 200] });
            boxBody.addShape(boxShape);
            this._world.addBody(boxBody);
        };
        p.createDebug = function () {
            var sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        };
        p.loop = function () {
            this._world.step(60 / 1000);
            this.debugDraw.drawDebug();
        };
        p.addOneBox = function (e) {
            var positionX = Math.floor(e.stageX);
            var positionY = Math.floor(e.stageY);
            if (Math.random() > 0.5) {
                var width = Math.random() * 150 + 50;
                var boxShape = new p2.Box({ width: width, height: 100 });
                var boxBody = new p2.Body({ mass: 30, position: [positionX, positionY], angularVelocity: 0 });
                boxBody.addShape(boxShape);
                this._world.addBody(boxBody);
            }
            else {
                var circleShape = new p2.Circle({ radius: 50 });
                var circleBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
                circleBody.addShape(circleShape);
                this._world.addBody(circleBody);
            }
        };
        return PhysicTest2;
    })(Balance.DisplayObjectContainer);
    Balance.PhysicTest2 = PhysicTest2;
    egret.registerClass(PhysicTest2,"Balance.PhysicTest2");
})(Balance || (Balance = {}));
