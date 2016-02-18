module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class Avatar extends DisplayObjectContainer {
        private _currState: playerEnum;
        private _lastState: playerEnum;
        private _role: playerEnum;
        private _action: egret.MovieClip;
        private _mcFactory: egret.MovieClipDataFactory;
        private _body: p2.Body;
        public get body(): p2.Body
        {
            return this._body;
        }
        
		public constructor(role:playerEnum) {
            super();
            this._role = role;
            this._currState = playerEnum.STATE_NULL;
            var data = RES.getRes("princessWalkData");
            var txtr = RES.getRes("princessWalkPng");
            this._mcFactory = new egret.MovieClipDataFactory(data,txtr);
		}
		
        public setBody(body:p2.Body): void
        { 
            this._body = body;
        }
		
        public onInit()
        { 
            this._currState = playerEnum.STATE_ACTIVE;
            console.log("add avatar to the stage!");
        }
		
        public set state(s:playerEnum)
        { 
            if( this._currState != playerEnum.STATE_NULL && s != this._currState)
            { 
                this._lastState = this._currState;
                this._currState = s;
                console.log("set avatar state :"+this._currState);
                this.onStateChange();
            }
        }
        
        public get state(): playerEnum
        { 
            return this._currState;
        }
        
        private onStateChange()
        { 
            if(this._action && this._action.parent)
            { 
                this._action.parent.removeChild(this._action);
            }
            
            if(this._role == playerEnum.ROLE_PRINCESS) {
                if(this._currState == playerEnum.STATE_WALK)
                { 
                    this._action = new egret.MovieClip(this._mcFactory.generateMovieClipData("princessWalk"));
                    this.addChild(this._action);
                    this._action.frameRate = 12;
                    this._action.gotoAndPlay(0,999999);
                    console.log("princess start to walk!");
                }
            }
            else if(this._role == playerEnum.ROLE_BOY)
            { 
                
            }
        }
        
        
	}
}
