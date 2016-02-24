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
        public totalTime: number = 121;
        public isWin: boolean = false;
        private _starTake: number = 0;
        private _starTotal: number = 24;
        public starNeed: number = 3;
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
            this.gameUI.updateStarText(this._starTake,this.starNeed);
            this.addEventListener(EventEnum.STAR_TAKE,this.onStarTakenEvent,this);
            this.addEventListener(EventEnum.TIME_OVER,this.onTimeOverEvent,this);
            this.addEventListener(EventEnum.ROLE_FALL,this.onRoleFallEvent,this);
        }
        
        private onStarTakenEvent(evt: egret.Event)
        {
            this._starTake = evt.data as number;
            console.log("!!!!!!!!!!!is taking star :"+evt.data);
            if(this.gameUI != null)
                this.gameUI.updateStarText(this._starTake,this.starNeed);
            if(this._starTake == this.starNeed)
            { 
                this.isWin = true;
                this.stopGame();
            }
        }
        
        private onRoleFallEvent(evt:egret.Event): void
        { 
            this.isWin = false;
            this.stopGame();
        }
        
        private onTimeOverEvent(evt:egret.Event): void
        { 
            this.isWin = false;
            if(this._starTake == this.starNeed)
            { 
                this.isWin = true;
            }
            this.stopGame();
        }
        
        private stopGame(): void
        { 
            this.dispatchEvent(new egret.Event(EventEnum.GAME_OVER,true,false,this));
        }
        
        public onRemove(): void
        { 
            console.log("remove gameController from stage!");
            this._starTake = 0;
            this.removeEventListener(EventEnum.STAR_TAKE,this.onStarTakenEvent,this);
            this.removeEventListener(EventEnum.TIME_OVER,this.onTimeOverEvent,this);
            this.removeEventListener(EventEnum.ROLE_FALL,this.onRoleFallEvent,this);
        }
	}
}
