module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class GameStart extends DisplayObjectContainer{
//        private sky: egret.Bitmap;
//        private bg: egret.Bitmap;
          private start: egret.Bitmap;
        
		public constructor() {
            super();
		}
		
        public onInit(): void
        { 
            var sky: egret.Bitmap = AssistFunctions.createBitmapByName("bg");
            this.addChild(sky);
            
            var bg: egret.Bitmap = AssistFunctions.createBitmapByName("darkMask");
            bg.fillMode = egret.BitmapFillMode.SCALE;
            bg.width = this.stage.width;
            bg.height = this.stage.height;
            this.addChild(bg);
            
            this.start = AssistFunctions.createBitmapByName("start");
            this.start.anchorOffsetX = this.start.width / 2;
            this.start.anchorOffsetY = this.start.height / 2;
            this.start.x = this.stage.width / 2;
            this.start.y = this.stage.height / 2;
            this.start.touchEnabled = true;
            this.addChild(this.start);
            this.start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartTouch,this);
        }
        
        private onStartTouch(evt: egret.TouchEvent)
        { 
            this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartTouch,this);
            console.log("enter game now!!!!!!!!!!!!!!");
            this.dispatchEvent(new egret.Event(EventEnum.GAME_START,true,false,this));
        }
	}
}
