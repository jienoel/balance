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
            var data = RES.getRes("playerSkinData");
            var txtr = RES.getRes("playerSkinPng");
            this._mcFactory = new egret.MovieClipDataFactory(data, txtr);
        }
        var d = __define,c=Avatar;p=c.prototype;
        d(p, "body"
            ,function () {
                return this._body;
            }
        );
        p.setBody = function (body) {
            this._body = body;
        };
        p.onInit = function () {
            this._currState = Balance.playerEnum.STATE_ACTIVE;
        };
        d(p, "state"
            ,function () {
                return this._currState;
            }
            ,function (s) {
                if (this._currState != Balance.playerEnum.STATE_NULL && s != this._currState) {
                    this._lastState = this._currState;
                    this._currState = s;
                    this.onStateChange();
                }
            }
        );
        p.onStateChange = function () {
            if (this._action && this._action.parent) {
                this._action.parent.removeChild(this._action);
            }
            var actionName = "";
            if (this._role == Balance.playerEnum.ROLE_PRINCESS) {
                if (this._currState == Balance.playerEnum.STATE_WALK) {
                    actionName = "princessWalk";
                }
                else if (this._currState == Balance.playerEnum.STATE_IDLE) {
                    actionName = "princessIdle";
                }
            }
            else if (this._role == Balance.playerEnum.ROLE_BOY) {
                if (this._currState == Balance.playerEnum.STATE_WALK) {
                    actionName = "boyWalk";
                }
                else if (this._currState == Balance.playerEnum.STATE_IDLE) {
                    actionName = "boyIdle";
                }
            }
            if (actionName != "") {
                this._action = new egret.MovieClip(this._mcFactory.generateMovieClipData(actionName));
                if (this.flip)
                    this._action.scaleX = -1;
                this.addChild(this._action);
                this._action.frameRate = 12;
                this._action.gotoAndPlay(0, 999999);
            }
        };
        return Avatar;
    })(Balance.DisplayObjectContainer);
    Balance.Avatar = Avatar;
    egret.registerClass(Avatar,"Balance.Avatar");
})(Balance || (Balance = {}));
//# sourceMappingURL=Avatar.js.map