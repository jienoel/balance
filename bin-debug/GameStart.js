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
        this._scene = new Balance.SceneContainer();
        this._scene.name = "scene";
        this.addChild(this._scene);
        this._scene.addEventListener("sceneClick", this.onSceneClick, this);
        this._physicWorld = new Balance.PhysicWorld();
        this._scene.addChild(this._physicWorld);
        var seesawBody = this.createSeesaw();
        var triangleBody = this.createTriangle();
        this.createPrincess();
        this.createBoy();
        this.createConstraint(seesawBody, triangleBody);
        console.log("seesaw location:" + this.seesaw.x + "," + this.seesaw.y);
    };
    p.createPrincess = function () {
        this.princess = new Balance.Role(Balance.playerEnum.ROLE_PRINCESS);
        this.princess.addToStage(this._scene);
        this.princess.avatar.state = Balance.playerEnum.STATE_IDLE;
        this.princess.avatar.anchorOffsetX = this.princess.avatar.width / 2;
        this.princess.avatar.anchorOffsetY = this.princess.avatar.height / 2;
        this.princess.x = 101;
        this.princess.y = 300;
        console.log("=====> princess size:" + this.princess.avatar.width + " : " + this.princess.avatar.height);
        var vertices = [[-28, -54], [28, -54], [28, 54], [-28, 54]];
        var shape = new p2.Convex({ vertices: vertices, width: 58, height: 108 });
        //var shape: p2.Circle = new p2.Circle({ radius:50});
        var body = new p2.Body({ mass: 1, position: [101, 300], angularVelocity: 0 });
        body.addShape(shape);
        this._physicWorld.world.addBody(body);
        body.displays = [this.princess.avatar];
        this.princess.avatar.setBody(body);
    };
    p.createBoy = function () {
        this.boy = new Balance.Role(Balance.playerEnum.ROLE_BOY);
        this.boy.addToStage(this._scene);
        this.boy.avatar.flip = true;
        this.boy.avatar.state = Balance.playerEnum.STATE_IDLE;
        this.boy.avatar.anchorOffsetX = -this.boy.avatar.width / 2;
        this.boy.avatar.anchorOffsetY = this.boy.avatar.height / 2;
        this.boy.x = 959;
        this.boy.y = 300;
        console.log("=====> boy size:" + this.boy.avatar.width + " : " + this.boy.avatar.height);
        var vertices = [[-28, -54], [28, -54], [28, 54], [-28, 54]];
        var shape = new p2.Convex({ vertices: vertices, width: 58, height: 108 });
        //var shape: p2.Circle = new p2.Circle({ radius:50});
        var body = new p2.Body({ mass: 1, position: [959, 300], angularVelocity: 0 });
        body.addShape(shape);
        this._physicWorld.world.addBody(body);
        body.displays = [this.boy.avatar];
        this.boy.avatar.setBody(body);
    };
    p.createSeesaw = function () {
        this.seesaw = AssistFunctions.createBitmapByName("seesaw");
        this.seesaw.anchorOffsetX = this.seesaw.width / 2;
        this.seesaw.anchorOffsetY = this.seesaw.height / 2;
        this._scene.addChild(this.seesaw);
        this.seesaw.x = 530;
        this.seesaw.y = 415;
        var x = this.seesaw.width;
        var y = this.seesaw.height;
        var vertices = [[-440, -10], [440, -10], [440, 10], [-440, 10]];
        var shape = new p2.Convex({ vertices: vertices, width: 880, height: 20 });
        var body = new p2.Body({ mass: 2, position: [530, 415], angularVelocity: 0 });
        this._center = 530;
        body.addShape(shape);
        this._physicWorld.world.addBody(body);
        body.displays = [this.seesaw];
        return body;
    };
    p.createTriangle = function () {
        var vertices = [[0, -40], [40, 40], [-40, 40]];
        var triangleShape = new p2.Convex({ vertices: vertices, width: 80, height: 80 });
        var triangleBody = new p2.Body({ mass: 0 });
        triangleBody.addShape(triangleShape);
        triangleBody.position[1] = 465;
        triangleBody.position[0] = 530;
        this._physicWorld.world.addBody(triangleBody);
        return triangleBody;
    };
    p.createConstraint = function (seesawBody, triangleBody) {
        var prismatic = new p2.PrismaticConstraint(triangleBody, seesawBody, {
            localAnchorA: [0, 0],
            localAnchorB: [0, 0],
            localAxisA: [0, 0],
            disableRotationalLock: true,
            upperLimit: 0,
            lowerLimit: 0
        });
        this._physicWorld.world.addConstraint(prismatic);
        var revoluteCon = new p2.RevoluteConstraint(triangleBody, seesawBody, {
            localPivotA: [0, -40], localPivotB: [0, 0], maxForce: 100
        });
        revoluteCon.setLimits(-60, 60);
        revoluteCon.upperLimitEnabled = true;
        revoluteCon.lowerLimitEnabled = true;
        revoluteCon.motorEnabled = true;
        revoluteCon.enableMotor();
        this._physicWorld.world.addConstraint(revoluteCon);
    };
    p.onSceneClick = function (evt) {
        var e = evt.data;
        var left = e.localX <= this.princess.x ? true : false;
        var dis = 0;
        //移动左边的角色(公主)
        if (e.localX < this._center) {
            dis = e.localX <= this.princess.avatar.body.position[0] ? -3 : 3;
            this.princess.move(dis, this.seesaw);
        }
        else {
            dis = e.localX <= this.boy.avatar.body.position[0] ? -3 : 3;
            this.boy.move(dis, this.seesaw);
        }
        // console.log("touching......" + this.princess.x + "   " + this.princess.y);
        // console.log("seesaw location:" + this.seesaw.x + "," + this.seesaw.y);
    };
    p.onTouchStop = function (evt) {
    };
    return GameStart;
})(Balance.DisplayObjectContainer);
egret.registerClass(GameStart,"GameStart");
