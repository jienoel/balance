module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class PhysicTest2 extends Balance.DisplayObjectContainer{
        private _world: p2.World;
        private _factor: number = 50;
        private debugDraw: p2DebugDraw;
        
		public constructor() {
            super();
		}
		
        public onInit()
        { 
            this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.addOneBox,this);
            this.createWorld();
            this.createGround();
            this.createBodies();
            this.createDebug();
        }
        
        private createWorld(): void
        { 
            var wrd: p2.World = new p2.World();
            wrd.sleepMode = p2.World.BODY_SLEEPING;
            wrd.gravity = [0,10];
            this._world = wrd;
        }
        
        private createGround(): void
        { 
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var groundShape: p2.Plane = new p2.Plane();
            var groundBody: p2.Body = new p2.Body();
            groundBody.position[0] = 400;
            groundBody.position[1] = stageHeight - 200;
            groundBody.angle = Math.PI;
            groundBody.addShape(groundShape);
            this._world.addBody(groundBody);
        }
        
        private createBodies(): void
        { 
            var boxShape: p2.Shape = new p2.Box({ 50000: 25000});
            var boxBody: p2.Body = new p2.Body({ mass: 1,position: [200,200] });
            boxBody.addShape(boxShape);
            this._world.addBody(boxBody);
        }
        
        private createDebug(): void
        { 
            var sprite: egret.Sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        }
        
        private loop(): void
        { 
            this._world.step(60 / 1000);
            this.debugDraw.drawDebug();
        }
        
        private addOneBox(e: egret.TouchEvent): void {
            var positionX: number = Math.floor(e.stageX);
            var positionY: number = Math.floor(e.stageY);
            if(Math.random() > 0.5 ) {
                var width: number = Math.random() * 150 + 50;
                var boxShape: p2.Box = new p2.Box({ width: width ,height:100});
                var boxBody: p2.Body = new p2.Body({ mass: 30,position: [positionX,positionY],angularVelocity: 0 });
                boxBody.addShape(boxShape);
                this._world.addBody(boxBody);
            }
            else
            { 
                var circleShape: p2.Circle = new p2.Circle({ radius: 50 });
                var circleBody: p2.Body = new p2.Body({ mass: 1,position: [positionX,positionY] });
                circleBody.addShape(circleShape);
                this._world.addBody(circleBody);
            }
        }
	}
}
