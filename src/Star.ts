module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class Star extends DisplayObjectContainer{
        private _skin: egret.Bitmap;
        private _currX: number;
        private _speedX: number ;
        private _speedY: number ;
        private _body: p2.Body;
        private _maxHeight: number;
        private _minusX: number;
        private _maxX: number;
        public get body(): p2.Body
        { 
            return this._body;
        }
        
		public constructor(minX:number,maxX:number,y:number,maxHeight:number) {
            this._speedX = 10;
            this._speedY = 1;
            this._minusX = minX;
            this._maxX = maxX;
            this._maxHeight = maxHeight;
            var x: number = this._minusX + Math.random() * (this._maxX - this._minusX);
            //console.log("--- star position: x-"+x+", y- "+y+" minX:"+this._minusX+"  maxX:"+this._maxX+" maxHeight:"+this._maxHeight);
            super();
            this._skin = AssistFunctions.createBitmapByName("star01");
            this._skin.anchorOffsetX = this._skin.width / 2;
            this._skin.anchorOffsetY = this._skin.height / 2;
            this._skin.x = x;
            this._skin.y = y;
            this.addChild(this._skin);
            //console.log("star size："+this._skin.x+"  "+this._skin.y);
            var vertices = [[-35,-30],[35,-30],[35,30],[-35,30]];
            var shape: p2.Convex = new p2.Convex({ vertices: vertices,width: 70,height: 60 });
            this._body = new p2.Body({ mass: 1,position: [x,y],angularVelocity: 0 });
            this._body.type = p2.Body.KINEMATIC;
            this._body.addShape(shape);
            this._body.displays = [this._skin];
		}
		
        public static isStar(bodyId:number): boolean
        { 
            return bodyId >= IDEnum.STAR_BEGIN_ID && bodyId <= IDEnum.STAR_END_ID;
        }
		
        public onInit()
        { 
            this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
        }
        
        private enterFrame(): void
        { 
            this.move();
        }
        
        public move():void
        { 
            //this._body.velocity = [0,20];
            this._body.position[1] += this._speedY ;
            if(Math.random() > 0.9)
            { 
                //this._currX = Math.round(0.5 - Math.random()) * this._speedX + this._body.position[0];
                this._currX = (0.5 - Math.random()) * this._speedX;
                //console.log("star start to move:" + this._currX);   
                this._currX += this._body.position[0];
                if(this._currX < this._minusX)
                { 
                    this._currX = this._minusX;
                }
                if(this._currX > this._maxX)
                { 
                    this._currX = this._maxX;
                }
                this._body.position[0] = this._currX;
            }
            //console.log("star start to move");
        }
        
        public onDestroyEvent(evt:egret.Event): void
        { 
            var id: number = evt.data as number;
           // console.log("this is a Destory! "+  this._body.id +"   -- id:"+id);
            if(this._body && this._body.id == id)
            { 
                this.destroy();
            }
        }
        
        private destroy():void
        { 
            this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
            this.removeChild(this._skin);
        }
        
        public onCollideTriggle(): void
        { 
            
        }
	}
}
