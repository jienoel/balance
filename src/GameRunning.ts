/**
	 *
	 * @author ChenJie
	 *
	 */
class GameRunning extends Balance.DisplayObjectContainer{
        
    private seesaw: egret.Bitmap;
    private princess: Balance.Role;
    private boy: Balance.Role;
    private _scene: Balance.SceneContainer;
    private _physicWorld: Balance.PhysicWorld;
    private _centerX: number;
    private _centerY: number;
    private _seesawWidth: number;
    private _starCount: number = 0;
    private _starTake: number = 0;
    //star controller
    private _timer: egret.Timer;
    public delayTime: number = 0;
    public maxStarCount: number = 0;
    public borderSize: number = 100;
    
    public constructor() {
        super();
    }
    
    public onInit()
    { 
        this._starCount = -1;
        if(this.maxStarCount == 0) {
            this.delayTime = 5000;
            this.maxStarCount = 10;
        }
        
        this._scene = new Balance.SceneContainer();
        this._scene.name = "scene";
        this.addChild(this._scene);
        this._scene.addEventListener("sceneClick",this.onSceneClick,this);
        
        this._physicWorld = new Balance.PhysicWorld();
        this._scene.addChild(this._physicWorld);
        this._physicWorld.world.on("beginContact",this.onBeginContact,this);
        this._physicWorld.world.on("endContact",this.onEndContact,this);
        
        var seesawBody:p2.Body =  this.createSeesaw();
        var triangleBody: p2.Body = this.createTriangle();
        var leftBorder: p2.Body = this.createLeftBorder();
        var rightBorder: p2.Body = this.createRightBorder();
        this.createPrincess();
        this.createBoy();
        //this.createStar();
        this.createConstraint(seesawBody,triangleBody);
        
        console.log("start to create timer:"+ (this._timer == null)+"    maxCount:"+this.maxStarCount);
        if(this._timer == null && this.maxStarCount > 0)
        { 
            this._timer = new egret.Timer(this.delayTime,this.maxStarCount);
            this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerEvent,this);
            this._timer.start();
           // console.log("==========>timer :" + this._timer.delay + "," + this._timer.repeatCount);
        }
    }
    
    private onTimerEvent(evt:egret.TimerEvent): void
    { 
        //console.log("----timerFunc count:" + (<egret.Timer>evt.target).currentCount);
        this.createStar();
    }
    
    private onBeginContact(evt): void
    { 
        var hit: boolean = false;
        if(this.isTakeStar(evt.bodyA.id,evt.bodyB.id))
        { 
            hit = true;
            this._starTake++;
            this.dispatchEvent(new egret.Event(Balance.EventEnum.STAR_TAKE,true,true,this._starTake))
           // console.log("------start to take star:" + evt.bodyA.id + "   :  " + evt.bodyB.id+"-----starTake/starCount:"+this._starTake+"/"+this._starCount);
        }
        else if(this.isHitSeeSaw(evt.bodyA.id,evt.bodyB.id))
        { 
            hit = true;
            var star: p2.Body = Balance.Star.isStar(evt.bodyA.id) ? evt.bodyA : evt.bodyB;
          //  console.log("------star hit the seesaw!----" + evt.bodyA.id + " : " + evt.bodyB.id);
        }
        
        if(hit)
        { 
            var star: p2.Body = Balance.Star.isStar(evt.bodyA.id) ? evt.bodyA : evt.bodyB;
            this._physicWorld.world.removeBody(star);
            this._scene.dispatchEvent(new egret.Event(Balance.EventEnum.STAR_DESTROY,false,true,star.id));
        }
    }
    
    private isHitSeeSaw(id1: number,id2: number): boolean
    { 
        var result1: number = 2;
        if(id1 == Balance.IDEnum.SEESAW_ID) {
            result1 = 0;
        }
        else if(Balance.Star.isStar(id1)) {
            result1 = 1;
        }

        var result2: number = 4;
        if(id2 == Balance.IDEnum.SEESAW_ID) {
            result2 = 0;
        }
        else if(Balance.Star.isStar(id2)) {
            result2 = 1;
        }

        return (result1 + result2) == 1;
    }
    
    private isTakeStar(id1: number,id2: number): boolean
    { 
        var result1: number = 2;
        if(Balance.Role.isRole(id1)) {
            result1 = 0;
        }
        else if(Balance.Star.isStar(id1))
        { 
            result1 = 1;
        }
        
        var result2: number = 4;
        if(Balance.Role.isRole(id2)) {
            result2 = 0;
        }
        else if(Balance.Star.isStar(id2)) {
            result2 = 1;
        }
        
        return (result1 + result2) == 1;
    }
    
    private onEndContact(evt): void
    { 
    
    }
    
    private createStar(): void
    { 
        var star : Balance.Star = new Balance.Star(this._centerX - this._seesawWidth,this._centerX + this._seesawWidth,100,this._centerY);
        this._starCount = this._starCount + 1 > Balance.IDEnum.STAR_END_ID - Balance.IDEnum.STAR_BEGIN_ID ? 0 : this._starCount + 1;
        star.body.id = Balance.IDEnum.STAR_BEGIN_ID + this._starCount;
        this._physicWorld.world.addBody(star.body);
        this._scene.addChild(star);
        this._scene.addEventListener(Balance.EventEnum.STAR_DESTROY,star.onDestroyEvent,star);
    }
    
    private createPrincess(): void
    { 
        this.princess = new Balance.Role(Balance.playerEnum.ROLE_PRINCESS);
        this.princess.addToStage(this._scene);
        this.princess.avatar.state = Balance.playerEnum.STATE_IDLE;
        this.princess.avatar.anchorOffsetX = this.princess.avatar.width / 2;
        this.princess.avatar.anchorOffsetY = this.princess.avatar.height / 2;
        this.princess.x = 101;
        this.princess.y = 300;
        
        var vertices = [[-28,-54],[28,-54],[28,54],[-28,54]];
        var shape: p2.Convex = new p2.Convex({ vertices: vertices,width: 58,height: 108 });
        //var shape: p2.Circle = new p2.Circle({ radius:50});
        var body: p2.Body = new p2.Body({ mass: 45,position: [101,300],angularVelocity: 0 });
        body.addShape(shape);
        body.id = Balance.IDEnum.PRINCESS_ID;
        this._physicWorld.world.addBody(body);
        body.displays = [this.princess.avatar];
        this.princess.avatar.setBody(body);
    }
    
    private createBoy(): void
    { 
        this.boy = new Balance.Role(Balance.playerEnum.ROLE_BOY);
        this.boy.addToStage(this._scene);
        this.boy.avatar.flip = true;
        this.boy.avatar.state = Balance.playerEnum.STATE_IDLE;
        this.boy.avatar.anchorOffsetX = -this.boy.avatar.width / 2;
        this.boy.avatar.anchorOffsetY = this.boy.avatar.height / 2;
        this.boy.x = 959;
        this.boy.y = 300;

        console.log("=====> boy size:" + this.boy.avatar.width + " : " + this.boy.avatar.height);
        var vertices = [[-28,-54],[28,-54],[28,54],[-28,54]];
        var shape: p2.Convex = new p2.Convex({ vertices: vertices,width: 58,height: 108 });
        //var shape: p2.Circle = new p2.Circle({ radius:50});
        var body: p2.Body = new p2.Body({ mass: 45,position: [959,300],angularVelocity: 0 });
        body.addShape(shape);
        this._physicWorld.world.addBody(body);
        body.displays = [this.boy.avatar];
        body.id = Balance.IDEnum.BOY_ID;
        this.boy.avatar.setBody(body);
    }
     
    private createLeftBorder(): p2.Body 
    {
        var vertices = [[-440,-50],[440,-50],[440,50],[-440,50]];
        var shape: p2.Convex = new p2.Convex({ vertices: vertices,width: 880,height: this.borderSize * 2 });
        var body: p2.Body = new p2.Body({mass:0,Position:[186,555],angularVelocity:0});
        body.type = p2.Body.KINEMATIC;
        body.addShape(shape);
        body.fixedRotation = true;
        body.id = Balance.IDEnum.LEFTBORDER_ID;
        this._physicWorld.world.addBody(body);
        return body;
    }
    
    private createRightBorder(): p2.Body
    { 
        var vertices = [[-4,-50],[4,-50],[4,50],[-4,50]];
        var shape: p2.Convex = new p2.Convex({ vertices: vertices,width: 8,height: 100 });
        var body: p2.Body = new p2.Body({ mass: 0,Position: [616,355],angularVelocity: 0 });
        body.type = p2.Body.KINEMATIC;
        body.addShape(shape);
        body.fixedRotation = true;
        body.id = Balance.IDEnum.RIGHTBORDER_ID;
        this._physicWorld.world.addBody(body);
        return body;
    }
    
    private createSeesaw(): p2.Body 
    {
        this.seesaw = AssistFunctions.createBitmapByName("seesaw");
        this.seesaw.anchorOffsetX = this.seesaw.width / 2;
        this.seesaw.anchorOffsetY = this.seesaw.height / 2;
        this._scene.addChild(this.seesaw);

        this.seesaw.x = 530;
        this.seesaw.y = 415;
        
        var vertices = [[-440,-10],[440,-10],[440,10],[-440,10]];
        var shape: p2.Convex = new p2.Convex({vertices: vertices,width: 880,height: 20});
        var body: p2.Body = new p2.Body({ mass: 100,position: [530,415],angularVelocity: 0 });
        this._centerX = 530;
        this._centerY = 415;
        console.log("-------------->seesaw width:"+this.seesaw.width);
        this._seesawWidth = 440;
        body.addShape(shape);
        body.id = Balance.IDEnum.SEESAW_ID;
        body.fixedX = true;
        body.fixedY = true;
        this._physicWorld.world.addBody(body);
        body.displays = [this.seesaw];
        return body;
    }
    
    private createTriangle(): p2.Body
    { 
        var vertices = [[0,-40],[40,40],[-40,40]];
        var triangleShape = new p2.Convex({ vertices: vertices,width: 80,height: 80 });
        var triangleBody: p2.Body = new p2.Body({ mass: 0 });
        triangleBody.addShape(triangleShape);
        triangleBody.position[1] = 465;
        triangleBody.position[0] = 530;
        triangleBody.id = Balance.IDEnum.TRIANGLE_ID;
        this._physicWorld.world.addBody(triangleBody);
        return triangleBody;
    }

    private createBorderConstraint(seesawBody: p2.Body,leftBody: p2.Body,rightBody: p2.Body): void
    { 
        var disConstraint: p2.DistanceConstraint = new p2.DistanceConstraint(seesawBody,leftBody,{
                distance: Math.sqrt(this._seesawWidth * this._seesawWidth + this.borderSize * this.borderSize),
                localAnchorA:[0,0],
                localAnchorB:[0,0]
            });
        disConstraint.collideConnected = false;
        disConstraint.upperLimitEnabled = true;
        disConstraint.upperLimit = 1;
        disConstraint.lowerLimitEnabled = true;
        disConstraint.lowerLimit = -1;
        this._physicWorld.world.addConstraint(disConstraint);
    }
    
    private createConstraint(seesawBody:p2.Body,triangleBody:p2.Body): void
    { 
        var disConstraint: p2.DistanceConstraint = new p2.DistanceConstraint(triangleBody,seesawBody,{
            distance:0,
            localAnchorA:[0,-40],
            localAnchorB:[0,0],
            });
        disConstraint.collideConnected = false;
        disConstraint.distance = 0;
        disConstraint.upperLimitEnabled = true;
        disConstraint.upperLimit = 1;
        disConstraint.lowerLimitEnabled = true;
        disConstraint.lowerLimit = -1;
        this._physicWorld.world.addConstraint(disConstraint);   
        
        var prismatic: p2.PrismaticConstraint = new p2.PrismaticConstraint(triangleBody,seesawBody,{
            localAnchorA: [0,-40],
            localAnchorB: [0,0],
            localAxisA: [0,0],
            disableRotationalLock: false,
            upperLimit: 180,
            lowerLimit: -180
        });
       this._physicWorld.world.addConstraint(prismatic);

        var revoluteCon: p2.RevoluteConstraint = new p2.RevoluteConstraint(triangleBody,seesawBody,
            {
                localPivotA: [0,-40],localPivotB: [0,0],maxForce: 1000
            });
        revoluteCon.setLimits(-60,60);
        revoluteCon.upperLimitEnabled = true;
        revoluteCon.lowerLimitEnabled = true;
        revoluteCon.motorEnabled = true;
        revoluteCon.setStiffness(0.1);
        revoluteCon.enableMotor();
        this._physicWorld.world.addConstraint(revoluteCon);
        
        var s: p2.RotationalSpring = new p2.RotationalSpring(triangleBody,seesawBody,{ stiffness: 10 });
        s.restAngle = Math.PI / 2;
        this._physicWorld.world.addSpring(s);
    }
    
    private onSceneClick(evt:egret.Event)
    { 
        var e: egret.TouchEvent = evt.data as egret.TouchEvent;
        var left: boolean = e.localX <= this.princess.x ? true : false;
        var disconst: number = 10;
        var dis: number = 0;
        //移动左边的角色(公主)
        if(e.localX < this._centerX) {
            dis = e.localX <= this.princess.avatar.body.position[0] ? -disconst : disconst;
            this.princess.move(dis,this.seesaw);
        }
        else
        { 
            dis = e.localX <= this.boy.avatar.body.position[0] ? -disconst : disconst;
            this.boy.move(dis,this.seesaw);
        }
        console.log("------>seesaw:"+this.seesaw.x+"  :"+this.seesaw.y+"  pricess:"+this.princess.x+":"+this.princess.y+"  boy:"+this.boy.x+":"+this.boy.y);
    }
    
    private onTouchStop(evt: egret.Event): void
    { 
        if(this.princess.avatar.state == Balance.playerEnum.STATE_WALK)
        { 
            this.princess.avatar.state = Balance.playerEnum.STATE_IDLE;
        }
        if(this.boy.avatar.state == Balance.playerEnum.STATE_WALK)
        { 
            this.boy.avatar.state = Balance.playerEnum.STATE_IDLE;
        }
    }
    
    private removeEvent(): void
    { 
        if(this._timer && this._timer.running)
        { 
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerEvent,this);
        }
    }
    
    public OnRemove(): void
    { 
        console.log("-----remove GameRunning from stage!");
        this.removeEvent();
    }
}
