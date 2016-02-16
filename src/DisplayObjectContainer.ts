module Balance {
	/**
	 *
	 * @author 
	 *
	 */
	export class DisplayObjectContainer extends egret.DisplayObjectContainer{
		public constructor() {
            super();
            if(this.stage) {
                this.init();
            }
            else {
                this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
            }
		}
		
        private addToStage(event: egret.Event)
        { 
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
            this.init();
            this.onAddToStage(event);
        }
		
        public onAddToStage(event:egret.Event)
        { 
            
        }
        
        private init()
        { 
            this.onInit();
        }
		
        public onInit()
        { 
            
        }
	}
}
