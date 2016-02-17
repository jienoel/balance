module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class PhysicTest3 extends DisplayObjectContainer{
		
        private _world: p2.World;
        private debugDraw: p2DebugDraw;
        
    	public constructor() {
            super();
		}
		
        public onInit()
        { 
            this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
            this.createWorld();
            this.createGround();
            this.createDebug();
        }
        
        private enterFrame(): void
        { 
            this._world.step(60 / 1000);
            this.debugDraw.drawDebug();
        }
        
        private createWorld() : void
        { 
            var wrd: p2.World = new p2.World();
            wrd.gravity = [0,-10];
            this._world = wrd;
        }  
        
        private createGround(): void
        {
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var groundShape: p2.Plane = new p2.Plane();
            var groundBody: p2.Body = new p2.Body({mass:0});
            groundBody.position[1] = stageHeight - 100;
            groundBody.angle = Math.PI;
            groundBody.addShape(groundShape);
            this._world.addBody(groundBody);
            console.log("create ground! " + groundBody.position[0] + ":" + groundBody.position[1] + "   / " + stageHeight);
        }
        
        private createDebug(): void {
            var sprite: egret.Sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        }
	}
}
