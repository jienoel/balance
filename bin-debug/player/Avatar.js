var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var Avatar = (function (_super) {
        __extends(Avatar, _super);
        function Avatar(role) {
            _super.call(this);
            this._role = role;
            this._currState = Balance.playerEnum.STATE_NULL;
            var data = RES.getRes("princessWalkData");
            var txtr = RES.getRes("princessWalkPng");
            this._mcFactory = new egret.MovieClipDataFactory(data, txtr);
        }
        var d = __define,c=Avatar;p=c.prototype;
        p.onInit = function () {
            this._currState = Balance.playerEnum.STATE_ACTIVE;
            console.log("add avatar to the stage!");
        };
        d(p, "state"
            ,function () {
                return this._currState;
            }
            ,function (s) {
                if (this._currState != Balance.playerEnum.STATE_NULL && s != this._currState) {
                    this._lastState = this._currState;
                    this._currState = s;
                    console.log("set avatar state :" + this._currState);
                    this.onStateChange();
                }
            }
        );
        p.onStateChange = function () {
            if (this._action && this._action.parent) {
                this._action.parent.removeChild(this._action);
            }
            if (this._role == Balance.playerEnum.ROLE_PRINCESS) {
                if (this._currState == Balance.playerEnum.STATE_WALK) {
                    this._action = new egret.MovieClip(this._mcFactory.generateMovieClipData("princessWalk"));
                    this.addChild(this._action);
                    this._action.frameRate = 12;
                    this._action.gotoAndPlay(0, 999999);
                    console.log("princess start to walk!");
                }
            }
            else if (this._role == Balance.playerEnum.ROLE_BOY) {
            }
        };
        return Avatar;
    })(Balance.DisplayObjectContainer);
    Balance.Avatar = Avatar;
    egret.registerClass(Avatar,"Balance.Avatar");
})(Balance || (Balance = {}));
//# sourceMappingURL=Avatar.js.map