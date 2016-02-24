var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var PhysicTest4 = (function (_super) {
        __extends(PhysicTest4, _super);
        function PhysicTest4() {
            _super.call(this);
            this._factor = 50.0;
        }
        var d = __define,c=PhysicTest4;p=c.prototype;
        p.onInit = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            if (!this._world) {
                this.createWorld();
            }
            this.createGround();
            this.createDebug();
            // this.createBox();
        };
        p.enterFrame = function () {
            this._world.step(60 / 1000);
            this.updatePhysic();
            this.debugDraw.drawDebug();
        };
        p.createDebug = function () {
            var sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        };
        p.updatePhysic = function () {
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = this._world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = this._world.bodies[i];
                var box = boxBody.displays[0];
                if (box && boxBody.type != p2.Body.STATIC) {
                    box.x = boxBody.position[0];
                    box.y = boxBody.position[1];
                    //box.x = boxBody.position[0] * this._factor;
                    //box.y = stageHeight - boxBody.position[1] * this._factor;
                    box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                    //console.log("sync box pos:" + box.x + "," + box.y+"   "+this._factor);
                    if (boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 0.5;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
        };
        p.createWorld = function () {
            var wrd = new p2.World();
            wrd.gravity = [0, 10];
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
            var display = AssistFunctions.createBitmapByName("bgImage");
            display.width = 600;
            display.height = 20;
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            //display.x = groundBody.position[0] * this._factor;
            //display.y = groundBody.position[1] * this._factor;
            console.log("ground image position:" + display.x + ":" + display.y);
            groundBody.displays = [display];
            //this.addChild(display);
            console.log("create ground! " + groundBody.position[0] + ":" + groundBody.position[1] + "   / " + stageHeight);
        };
        p.createBox = function () {
            var display = AssistFunctions.createBitmapByName("rect");
            console.log("the size of display object:" + display.width + ":" + display.height);
            var x = display.width / this._factor;
            var y = display.height / this._factor;
            var boxShape = new p2.Box({ x: y });
            var boxBody = new p2.Body({ mass: 1, position: [100, 100], angularVelocity: 0 });
            boxBody.addShape(boxShape);
            this._world.addBody(boxBody);
            console.log("the box shape size:" + boxShape.width + ":" + boxShape.height);
            //display.width = (<p2.Box>boxShape).width * this._factor;
            // display.height = (<p2.Box>boxShape).height * this._factor;
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            boxBody.displays = [display];
            this.addChild(display);
            console.log("add box and box pos:" + boxBody.position[0] + ":" + boxBody.position[1]
                + " image pos:" + display.x + ":" + display.y);
        };
        return PhysicTest4;
    })(Balance.DisplayObjectContainer);
    Balance.PhysicTest4 = PhysicTest4;
    egret.registerClass(PhysicTest4,"Balance.PhysicTest4");
})(Balance || (Balance = {}));
//# sourceMappingURL=PhysicTest4.js.map