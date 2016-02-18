var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var Role = (function () {
        function Role(role, physicWorld) {
            this._avatar = new Balance.Avatar(role, physicWorld);
            console.log("create a new role :" + role);
        }
        var d = __define,c=Role;p=c.prototype;
        d(p, "avatar"
            ,function () {
                return this._avatar;
            }
        );
        d(p, "x"
            ,function () {
                return this._avatar.x;
            }
            ,function (x) {
                this._avatar.x = x;
            }
        );
        d(p, "y"
            ,function () {
                return this._avatar.y;
            }
            ,function (y) {
                this._avatar.y = y;
            }
        );
        p.addToStage = function (parent) {
            if (this._avatar) {
                if (this._avatar.parent && this._avatar.parent != parent) {
                    this._avatar.parent.removeChild(this._avatar);
                }
                console.log("start add avatar to the parent :" + parent.name);
                parent.addChild(this._avatar);
            }
        };
        p.move = function (left) {
            this._avatar.state = Balance.playerEnum.STATE_WALK;
            if (left) {
                this._avatar.x -= 3;
            }
            else {
                this._avatar.x += 3;
            }
        };
        return Role;
    })();
    Balance.Role = Role;
    egret.registerClass(Role,"Balance.Role");
})(Balance || (Balance = {}));
