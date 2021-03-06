module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
    export class PhysicTest4 extends DisplayObjectContainer{
        private _world: p2.World;
        private _boy: p2.Body;
        private _girl: p2.Body;
        private _center: number;
        private debugDraw: p2DebugDraw;
        private _factor: number;
		public constructor() {
            super();
            this._factor = 50.0;
		}
		
        public onInit()
        { 
            this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
            if(!this._world) {
                this.createWorld();
            }
            this.createGround();
            this.createDebug();
           // this.createBox();
        }
        
        private enterFrame(): void {
            this._world.step(60 / 1000);
            this.updatePhysic();
            this.debugDraw.drawDebug();
        }
        
        private createDebug(): void {
            var sprite: egret.Sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        }
        
        private updatePhysic(): void
        { 
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l = this._world.bodies.length;
            for(var i: number = 0;i < l;i++) {
                var boxBody: p2.Body = this._world.bodies[i];
                var box: egret.DisplayObject = boxBody.displays[0];
                if(box && boxBody.type != p2.Body.STATIC) {
                    box.x = boxBody.position[0] ;
                    box.y = boxBody.position[1] ;
                    //box.x = boxBody.position[0] * this._factor;
                    //box.y = stageHeight - boxBody.position[1] * this._factor;
                    box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                    //console.log("sync box pos:" + box.x + "," + box.y+"   "+this._factor);
                    if(boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 0.5;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
        }
        
        private createWorld(): void {
            var wrd: p2.World = new p2.World();
            wrd.gravity = [0,10];
            this._world = wrd;
        }
        
        private createGround(): void {
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var groundShape: p2.Plane = new p2.Plane();
            var groundBody: p2.Body = new p2.Body({ mass: 0 });
            groundBody.position[1] = stageHeight - 100;
            groundBody.angle = Math.PI;
            groundBody.addShape(groundShape);
            this._world.addBody(groundBody);
            
            var display: egret.DisplayObject = AssistFunctions.createBitmapByName("bgImage");
            display.width = 600;
            display.height = 20;
            display.anchorOffsetX = display.width / 2
            display.anchorOffsetY = display.height / 2;
            //display.x = groundBody.position[0] * this._factor;
            //display.y = groundBody.position[1] * this._factor;
            console.log("ground image position:" + display.x + ":"+display.y);
            groundBody.displays = [display];
            //this.addChild(display);
            
            console.log("create ground! " + groundBody.position[0] + ":" + groundBody.position[1] + "   / " + stageHeight);
        }
        
        private createBox(): void
        { 
            var display: egret.DisplayObject = AssistFunctions.createBitmapByName("rect");
            console.log("the size of display object:"+display.width + ":"+ display.height);
            var x: number = display.width / this._factor;
            var y: number = display.height / this._factor;
            
            var boxShape: p2.Shape = new p2.Box({ x: y });
            var boxBody: p2.Body = new p2.Body({ mass: 1,position: [100,100],angularVelocity: 0 });
            boxBody.addShape(boxShape);
            this._world.addBody(boxBody);

            console.log("the box shape size:"+(<p2.Box>boxShape).width + ":" + (<p2.Box>boxShape).height);
            //display.width = (<p2.Box>boxShape).width * this._factor;
           // display.height = (<p2.Box>boxShape).height * this._factor;
            display.anchorOffsetX = display.width / 2
            display.anchorOffsetY = display.height / 2;
            boxBody.displays = [display];
            this.addChild(display);
            
            console.log("add box and box pos:"+boxBody.position[0]+":"+boxBody.position[1]
            + " image pos:"+display.x+":"+display.y);
        }
	}
}
