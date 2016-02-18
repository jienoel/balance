var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var PhysicWorld = (function (_super) {
        __extends(PhysicWorld, _super);
        function PhysicWorld() {
            _super.call(this);
        }
        var d = __define,c=PhysicWorld;p=c.prototype;
        d(p, "factor"
            ,function () {
                return this._factor;
            }
        );
        d(p, "world"
            ,function () {
                return this._world;
            }
        );
        p.createWorld = function () {
            var wrd = new p2.World();
            wrd.gravity = [0, 80];
            this._world = wrd;
            console.log("=========create world!");
        };
        p.onInit = function () {
            if (!this._world) {
                this.createWorld();
            }
            this.createGround();
            this.createDebug();
            //this.createBox();
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        p.enterFrame = function () {
            this._world.step(60 / 1000);
            this.updatePhysic();
            this.debugDraw.drawDebug();
        };
        p.createGround = function () {
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var groundShape = new p2.Plane();
            var groundBody = new p2.Body({ mass: 0 });
            groundBody.position[1] = stageHeight - 10;
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
        p.updatePhysic = function () {
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = this._world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = this._world.bodies[i];
                if (boxBody.type == p2.Body.STATIC || boxBody.displays == null) {
                    continue;
                }
                var box = boxBody.displays[0];
                if (box && boxBody.type != p2.Body.STATIC) {
                    box.x = boxBody.position[0];
                    box.y = boxBody.position[1];
                    box.rotation = boxBody.angle * 180 / Math.PI;
                    if (boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 0.5;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
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
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            boxBody.displays = [display];
            this.parent.addChild(display);
            console.log("add box and box pos:" + boxBody.position[0] + ":" + boxBody.position[1]
                + " image pos:" + display.x + ":" + display.y);
        };
        return PhysicWorld;
    })(Balance.DisplayObjectContainer);
    Balance.PhysicWorld = PhysicWorld;
    egret.registerClass(PhysicWorld,"Balance.PhysicWorld");
})(Balance || (Balance = {}));
