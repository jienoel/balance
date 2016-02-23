module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class GameController extends DisplayObjectContainer{
        public level: number;
        public gameRunning: GameRunning;
        public gameUI: GameUI;
        public totalTime: number = 120;
        public isWin: boolean = false;
        private _starTake: number = 0;
        private _starTotal: number = 24;
		public constructor() {
            super();
		}
		
        public onInit(): void
        { 
            this.gameRunning = new GameRunning();
            this.gameRunning.delayTime = 5000;
            this.gameRunning.maxStarCount = this._starTotal;
            this.addChild(this.gameRunning);
            
            this.gameUI = new GameUI();
            this.addChild(this.gameUI);
            this.gameUI.totalTime = this.totalTime;
            this.gameUI.state = GameStatusEnum.RUNNING;
            this.gameUI.updateStarText(this._starTake,this._starTotal);
            this.addEventListener(EventEnum.STAR_TAKE,this.onStarTakenEvent,this);
        }
        
        private onStarTakenEvent(evt: egret.Event)
        {
            this._starTake = evt.data as number;
            console.log("!!!!!!!!!!!is taking star :"+evt.data);
            if(this.gameUI != null)
                this.gameUI.updateStarText(this._starTake,this._starTotal);
        }
        
        private stopGame(): void
        { 
            this.gameRunning.destroy();
            this.dispatchEvent(new egret.Event(EventEnum.GAME_OVER,true,false,this));
        }
	}
}
