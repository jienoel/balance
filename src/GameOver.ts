module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class GameOver extends DisplayObjectContainer{
        private result: egret.Bitmap;
        private darkMask: egret.Bitmap;
        private _isWin: boolean;
        
		public constructor(isWin:boolean) {
            super();
            this._isWin = isWin;
		}
		
        public onInit(): void
        { 
            var sky: egret.Bitmap = AssistFunctions.createBitmapByName("bg");
            this.addChild(sky);
            
            this.darkMask = AssistFunctions.createBitmapByName("darkMask");
            this.darkMask.fillMode = egret.BitmapFillMode.SCALE;
            this.darkMask.width = this.stage.width;
            this.darkMask.height = this.stage.height;
            this.addChild(this.darkMask);
            
            if(this._isWin) {
                this.result = AssistFunctions.createBitmapByName("win");
            }
            else
            { 
                this.result = AssistFunctions.createBitmapByName("fail");
            }
            
            this.result.anchorOffsetX = this.result.width / 2;
            this.result.anchorOffsetY = this.result.height / 2;
            this.result.x = this.stage.width / 2;
            this.result.y = this.stage.height / 2;
            this.result.touchEnabled = true;
            this.addChild(this.result);
            this.result.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onResultTouch,this);
        }
        
        private onResultTouch(evt:egret.TouchEvent): void
        { 
            this.result.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onResultTouch,this);
            console.log("on result touch!   "+this._isWin);
            this.dispatchEvent(new egret.Event(EventEnum.GAME_RESTART,true,false,evt));
        }
	}
}
