module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class PhysicTest3 extends DisplayObjectContainer{
		
        private _world: p2.World;
        private _boy: p2.Body;
        private _girl: p2.Body;
        private _center: number;
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
            this.createSeeSaw();
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        }
        
        private onTouch(e: egret.TouchEvent): void {
            var positionX: number = Math.floor(e.stageX);
            var positionY: number = Math.floor(e.stageY);
            console.log("touch pos:" + positionX + "," + positionY + "  boy:" + this._boy.position 
                + "  girl:" + this._girl.position);
            if(positionX < this._center) {
                // move left avatar : boy
                if(positionX < this._boy.position[0]) {
                    this._boy.position[0] -= 2;
                }
                else
                { 
                    this._boy.position[0] += 2;
                }
            }
            if(positionX > this._center)
            { 
                // move right avatar : girl
                if(positionX < this._girl.position[0]) {
                    this._girl.position[0] -= 2;
                }
                else
                { 
                    this._girl.position[0] += 2;
                }
            }
        }
        
        private enterFrame(): void
        { 
            this._world.step(60 / 1000);
            this.debugDraw.drawDebug();
        }
        
        private createWorld() : void
        { 
            var wrd: p2.World = new p2.World();
            wrd.gravity = [0,10];
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
        
        private createSeeSaw(): void {
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var stageWidth: number = egret.MainContext.instance.stage.stageWidth;
            
            //create triangle 
            var vertices = [[0,-40],[40,40],[-40,40]];
            var triangleShape = new p2.Convex({ vertices: vertices , width : 80, height : 80});
            var triangleBody: p2.Body = new p2.Body({mass:0});
            triangleBody.addShape(triangleShape);
            triangleBody.position[1] = stageHeight - 140;
            triangleBody.position[0] = stageWidth/2 - 40;
            this._center = triangleBody.position[0];
            this._world.addBody(triangleBody);
            
            //create left box
            var leftBoxShape: p2.Box = new p2.Box({ width: 400,height: 2 });
            var leftBoxBody: p2.Body = new p2.Body({ mass: 10 });
            leftBoxBody.addShape(leftBoxShape);
            leftBoxBody.position[1] = triangleBody.position[1] - 41;
            leftBoxBody.position[0] = triangleBody.position[0];
            this._world.addBody(leftBoxBody);
            
            //on the left
            var boyShape: p2.Box = new p2.Box({width: 30, height:20});
            var boyBody: p2.Body = new p2.Body({ mass: 2 });
            boyBody.addShape(boyShape);
            boyBody.position[1] = triangleBody.position[1] - 41 - 50;
            boyBody.position[0] = triangleBody.position[0] - 100;
            this._boy = boyBody;
            this._world.addBody(boyBody);
            
            //on the right
            var girlShape: p2.Box = new p2.Box({width:30,height:20});
            var girlBody: p2.Body = new p2.Body({mass:2});
            girlBody.addShape(girlShape);
            girlBody.position[1] = triangleBody.position[1] - 41 - 50;
            girlBody.position[0] = triangleBody.position[0] + 100;
            this._girl = girlBody;
            this._world.addBody(girlBody);
        }
        
        private createDebug(): void {
            var sprite: egret.Sprite = new egret.Sprite();
            this.addChild(sprite);
            this.debugDraw = new p2DebugDraw(this._world);
            this.debugDraw.setSprite(sprite);
        }
	}
}
