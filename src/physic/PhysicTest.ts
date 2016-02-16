module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class PhysicTest extends Balance.DisplayObjectContainer{
        private _world: p2.World;
        private _factor: number = 50;
		public constructor() {
            super();
		}
		
        public onInit()
        { 
            //创建world
            this._world = new p2.World();
            this._world.sleepMode = p2.World.BODY_SLEEPING;
            
            this.RectAndCircle();
            egret.Ticker.getInstance().register(this.onTick,this);
            //鼠标点击添加刚体
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
            
        }
        
        private onTouch(e: egret.TouchEvent): void {
            var positionX: number = Math.floor(e.stageX / this._factor);
            var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / this._factor);
            this.addOneBox(positionX,positionY);
        }
    
        private addOneBox(positionX,positionY) {
            if(Math.random() > 0.5) {
                //添加方形刚体
                var boxShape: p2.Shape = new p2.Box({ 2: 1 });
                var boxBody: p2.Body = new p2.Body({ mass: 1,position: [positionX,positionY],angularVelocity: 1 });
                boxBody.addShape(boxShape);
                this._world.addBody(boxBody);

                var display: egret.DisplayObject = AssistFunctions.createBitmapByName("rect");
                display.width = (<p2.Box>boxShape).width * this._factor;
                display.height = (<p2.Box>boxShape).height * this._factor;
            }
            else {
                //添加圆形刚体
                var boxShape: p2.Shape = new p2.Circle({ radius: 1 });
                var boxBody: p2.Body = new p2.Body({ mass: 1,position: [positionX,positionY] });
                boxBody.addShape(boxShape);
                this._world.addBody(boxBody);

                var display: egret.DisplayObject = AssistFunctions.createBitmapByName("circle");
                display.width = (<p2.Circle>boxShape).radius * 2 * this._factor;
                display.height = (<p2.Circle>boxShape).radius * 2 * this._factor;
            }

            if(!false) {
                display.anchorOffsetX = display.width / 2
                display.anchorOffsetY = display.height / 2;
                boxBody.displays = [display];
                this.addChild(display);
            }
        }
    
        private onTick(dt:number)
        { 
            if(dt < 10) {
                return;
            }
            if(dt > 1000) {
                return;
            }
            this._world.step(dt / 1000);

            if(!false) {
                var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
                var l = this._world.bodies.length;
                for(var i: number = 0;i < l;i++) {
                    var boxBody: p2.Body = this._world.bodies[i];
                    var box: egret.DisplayObject = boxBody.displays[0];
                    if(box) {
                        box.x = boxBody.position[0] * this._factor;
                        box.y = stageHeight - boxBody.position[1] * this._factor;
                        box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                        if(boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.5;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }
            }
        }
        
        public RectAndCircle() {
            //创建plane
            var planeShape: p2.Plane = new p2.Plane();
            var planeBody: p2.Body = new p2.Body();
            planeBody.addShape(planeShape);
            planeBody.displays = [];
            this._world.addBody(planeBody);

            var bitmapFont: egret.BitmapFont = RES.getRes("font_fnt");

            var bitmapText: egret.BitmapText = new egret.BitmapText();

            bitmapText.text = "Click!"

            bitmapText.font = bitmapFont;
            bitmapText.anchorOffsetX = bitmapText.width / 2;
            bitmapText.anchorOffsetY = bitmapText.height / 2;
            bitmapText.x = this.stage.stageWidth / 2;
            bitmapText.y = this.stage.stageHeight / 2;
            this.addChild(bitmapText);
            bitmapText.touchEnabled = true;
            bitmapText.addEventListener(egret.TouchEvent.TOUCH_TAP,(event: egret.TouchEvent) => {
                this.removeChild(bitmapText);
            },this);
        }
    
	}
}
