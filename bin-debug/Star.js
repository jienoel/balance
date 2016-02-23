var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var Star = (function (_super) {
        __extends(Star, _super);
        function Star(minX, maxX, y, maxHeight) {
            this._speedX = 10;
            this._speedY = 1;
            this._minusX = minX;
            this._maxX = maxX;
            this._maxHeight = maxHeight;
            var x = this._minusX + Math.random() * (this._maxX - this._minusX);
            //console.log("--- star position: x-"+x+", y- "+y+" minX:"+this._minusX+"  maxX:"+this._maxX+" maxHeight:"+this._maxHeight);
            _super.call(this);
            this._skin = AssistFunctions.createBitmapByName("star01");
            this._skin.anchorOffsetX = this._skin.width / 2;
            this._skin.anchorOffsetY = this._skin.height / 2;
            this._skin.x = x;
            this._skin.y = y;
            this.addChild(this._skin);
            //console.log("star size："+this._skin.x+"  "+this._skin.y);
            var vertices = [[-35, -30], [35, -30], [35, 30], [-35, 30]];
            var shape = new p2.Convex({ vertices: vertices, width: 70, height: 60 });
            this._body = new p2.Body({ mass: 1, position: [x, y], angularVelocity: 0 });
            this._body.type = p2.Body.KINEMATIC;
            this._body.addShape(shape);
            this._body.displays = [this._skin];
        }
        var d = __define,c=Star;p=c.prototype;
        d(p, "body"
            ,function () {
                return this._body;
            }
        );
        Star.isStar = function (bodyId) {
            return bodyId >= Balance.IDEnum.STAR_BEGIN_ID && bodyId <= Balance.IDEnum.STAR_END_ID;
        };
        p.onInit = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        p.enterFrame = function () {
            this.move();
        };
        p.move = function () {
            //this._body.velocity = [0,20];
            this._body.position[1] += this._speedY;
            if (Math.random() > 0.9) {
                //this._currX = Math.round(0.5 - Math.random()) * this._speedX + this._body.position[0];
                this._currX = (0.5 - Math.random()) * this._speedX;
                //console.log("star start to move:" + this._currX);   
                this._currX += this._body.position[0];
                if (this._currX < this._minusX) {
                    this._currX = this._minusX;
                }
                if (this._currX > this._maxX) {
                    this._currX = this._maxX;
                }
                this._body.position[0] = this._currX;
            }
            //console.log("star start to move");
        };
        p.onDestroyEvent = function (evt) {
            var id = evt.data;
            // console.log("this is a Destory! "+  this._body.id +"   -- id:"+id);
            if (this._body && this._body.id == id) {
                this.destroy();
            }
        };
        p.destroy = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.removeChild(this._skin);
        };
        p.onCollideTriggle = function () {
        };
        return Star;
    })(Balance.DisplayObjectContainer);
    Balance.Star = Star;
    egret.registerClass(Star,"Balance.Star");
})(Balance || (Balance = {}));
