module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class Role {
        private _avatar: Avatar;
		public constructor(role:playerEnum,physicWorld:PhysicWorld) {
            this._avatar = new Avatar(role,physicWorld);
            console.log("create a new role :" + role);
		}
		
        public get avatar(): Avatar
        { 
            return this._avatar;
        }
		
        public set x(x: number)
        { 
            this._avatar.x = x;
        }
        
        public get x(): number
        { 
            return this._avatar.x;
        }
        
        public set y(y: number)
        { 
            this._avatar.y = y;
        }
        
        public get y(): number
        { 
            return this._avatar.y;
        }
        
        public addToStage(parent:egret.DisplayObjectContainer)
        { 
            if(this._avatar)
            { 
                if(this._avatar.parent && this._avatar.parent != parent)
                { 
                    this._avatar.parent.removeChild(this._avatar);
                }
                console.log("start add avatar to the parent :" + parent.name);
                parent.addChild(this._avatar);
            }
        }
        
        public move(left:boolean)
        { 
            this._avatar.state = playerEnum.STATE_WALK;
            if(left) {
                this._avatar.x -= 3;
            }
            else
            { 
                this._avatar.x += 3;
            }
        }
	}
}
