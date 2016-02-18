module Balance {
	/**
	 *
	 * @author ChenJie
	 *
	 */
	export class Role {
        private _avatar: Avatar;
		public constructor(role:playerEnum) {
            this._avatar = new Avatar(role);
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
        
        public move(dis:number,refrence:egret.DisplayObject)
        { 
            this._avatar.state = playerEnum.STATE_WALK;
            this.CoordinateTransformation(refrence,dis);
        }
        
        private CoordinateTransformation(reference:egret.DisplayObject,dis:number): void
        { 
            //avatar在世界坐标系的位置
            var posWorld1: egret.Point = this._avatar.localToGlobal(this._avatar.body.position[0],this._avatar.body.position[1] ,posWorld1);
            //avatar在平衡木坐标系统的位置
            var posRef1: egret.Point = reference.globalToLocal(posWorld1.x,posWorld1.y,posRef1);
            //avatar在平衡木坐标系中右移
            var posMove: egret.Point = new egret.Point(posRef1.x + dis,posRef1.y);
            //移动后的坐标点转换为世界坐标
            var posWorld2: egret.Point = reference.localToGlobal(posMove.x,posMove.y,posWorld2);
            //转换为世界坐标之后的点转换到avatar的坐标系
            var posAvatar: egret.Point = this._avatar.globalToLocal(posWorld2.x,posWorld2.y,posAvatar);
            this._avatar.body.position[0] = posAvatar.x;
            this._avatar.body.position[1] = posAvatar.y;
        }
	}
}
