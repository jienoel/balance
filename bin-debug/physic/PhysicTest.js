var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var PhysicTest = (function (_super) {
        __extends(PhysicTest, _super);
        function PhysicTest() {
            _super.call(this);
            this._factor = 50;
        }
        var d = __define,c=PhysicTest;p=c.prototype;
        p.onInit = function () {
            //创建world
            this._world = new p2.World();
            this._world.sleepMode = p2.World.BODY_SLEEPING;
            this.RectAndCircle();
            egret.Ticker.getInstance().register(this.onTick, this);
            //鼠标点击添加刚体
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        };
        p.onTouch = function (e) {
            var positionX = Math.floor(e.stageX / this._factor);
            var positionY = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / this._factor);
            this.addOneBox(positionX, positionY);
        };
        p.addOneBox = function (positionX, positionY) {
            if (Math.random() > 0.5) {
                //添加方形刚体
                var boxShape = new p2.Box({ 2: 1 });
                var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
                boxBody.addShape(boxShape);
                this._world.addBody(boxBody);
                var display = AssistFunctions.createBitmapByName("rect");
                display.width = boxShape.width * this._factor;
                display.height = boxShape.height * this._factor;
            }
            else {
                //添加圆形刚体
                var boxShape = new p2.Circle({ radius: 1 });
                var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
                boxBody.addShape(boxShape);
                this._world.addBody(boxBody);
                var display = AssistFunctions.createBitmapByName("circle");
                display.width = boxShape.radius * 2 * this._factor;
                display.height = boxShape.radius * 2 * this._factor;
            }
            if (!false) {
                display.anchorOffsetX = display.width / 2;
                display.anchorOffsetY = display.height / 2;
                boxBody.displays = [display];
                this.addChild(display);
            }
        };
        p.onTick = function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            this._world.step(dt / 1000);
            if (!false) {
                var stageHeight = egret.MainContext.instance.stage.stageHeight;
                var l = this._world.bodies.length;
                for (var i = 0; i < l; i++) {
                    var boxBody = this._world.bodies[i];
                    var box = boxBody.displays[0];
                    if (box) {
                        box.x = boxBody.position[0] * this._factor;
                        box.y = stageHeight - boxBody.position[1] * this._factor;
                        box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.5;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }
            }
        };
        p.RectAndCircle = function () {
            var _this = this;
            //创建plane
            var planeShape = new p2.Plane();
            var planeBody = new p2.Body();
            planeBody.addShape(planeShape);
            planeBody.displays = [];
            this._world.addBody(planeBody);
            var bitmapFont = RES.getRes("font_fnt");
            var bitmapText = new egret.BitmapText();
            bitmapText.text = "Click!";
            bitmapText.font = bitmapFont;
            bitmapText.anchorOffsetX = bitmapText.width / 2;
            bitmapText.anchorOffsetY = bitmapText.height / 2;
            bitmapText.x = this.stage.stageWidth / 2;
            bitmapText.y = this.stage.stageHeight / 2;
            this.addChild(bitmapText);
            bitmapText.touchEnabled = true;
            bitmapText.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                _this.removeChild(bitmapText);
            }, this);
        };
        return PhysicTest;
    })(Balance.DisplayObjectContainer);
    Balance.PhysicTest = PhysicTest;
    egret.registerClass(PhysicTest,"Balance.PhysicTest");
})(Balance || (Balance = {}));
