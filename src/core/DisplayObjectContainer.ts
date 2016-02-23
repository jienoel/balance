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
		
        private removeFromStage(event: egret.Event)
        { 
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
            this.remove();
            this.onRemoveFromStage(event);
        }
        
        public onAddToStage(event:egret.Event)
        { 
            
        }
        
        private init()
        { 
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
            this.onInit();
        }
		
        public onInit()
        { 
            
        }
        
        public onRemoveFromStage(event: egret.Event)
        { 
            
        }
        
        private remove()
        { 
            this.onRemove();
        }
        
        public onRemove()
        { 
            
        }
	}
}
