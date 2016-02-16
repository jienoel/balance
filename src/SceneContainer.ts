module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class SceneContainer extends DisplayObjectContainer{
        private sky: egret.Bitmap;
        
		public constructor() {
            super();
		}
		
        public onInit()
        { 
            var sky: egret.Bitmap = AssistFunctions.createBitmapByName("bg");
            this.addChild(sky);
          
            sky.touchEnabled = true;
            sky.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkyTouch,this);
        }
        
        private onSkyTouch(evt: egret.TouchEvent) {
            this.dispatchEvent(new egret.Event("sceneClick",false,true,evt));   
        }
	}
}
