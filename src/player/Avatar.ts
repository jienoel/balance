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
        public flip: Boolean;
        public get body(): p2.Body
        {
            return this._body;
        }
        
		public constructor(role:playerEnum) {
            super();
            this._role = role;
            this._currState = playerEnum.STATE_NULL;
            var data = RES.getRes("playerSkinData");
            var txtr = RES.getRes("playerSkinPng");
            this._mcFactory = new egret.MovieClipDataFactory(data,txtr);
		}
		
        public setBody(body:p2.Body): void
        { 
            this._body = body;
        }
		
        public onInit()
        { 
            this._currState = playerEnum.STATE_ACTIVE;
        }
		
        public set state(s:playerEnum)
        { 
            if( this._currState != playerEnum.STATE_NULL && s != this._currState)
            { 
                this._lastState = this._currState;
                this._currState = s;
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
            var actionName: string = "";
            if(this._role == playerEnum.ROLE_PRINCESS) {
                if(this._currState == playerEnum.STATE_WALK) {
                    actionName = "princessWalk";
                }
                else if(this._currState == playerEnum.STATE_IDLE)
                { 
                    actionName = "princessIdle";
                }
            }
            else if(this._role == playerEnum.ROLE_BOY)
            { 
                if(this._currState == playerEnum.STATE_WALK) {
                    actionName = "boyWalk";
                }
                else if(this._currState == playerEnum.STATE_IDLE) {
                    actionName = "boyIdle";
                }
            }
            
            if(actionName != "")
            { 
                this._action = new egret.MovieClip(this._mcFactory.generateMovieClipData(actionName));
                if(this.flip)
                    this._action.scaleX = -1;
                this.addChild(this._action);
                this._action.frameRate = 12;
                this._action.gotoAndPlay(0,999999);
            } 
        }
        
        
	}
}
