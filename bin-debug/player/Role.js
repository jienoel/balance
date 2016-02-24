var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var Role = (function () {
        function Role(role) {
            this._avatar = new Balance.Avatar(role);
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
        Role.isRole = function (roleId) {
            return roleId == Balance.IDEnum.PRINCESS_ID || roleId == Balance.IDEnum.BOY_ID;
        };
        p.addToStage = function (parent) {
            if (this._avatar) {
                if (this._avatar.parent && this._avatar.parent != parent) {
                    this._avatar.parent.removeChild(this._avatar);
                }
                parent.addChild(this._avatar);
            }
        };
        p.move = function (dis, refrence) {
            this._avatar.state = Balance.playerEnum.STATE_WALK;
            this.CoordinateTransformation(refrence, dis);
        };
        //用物理坐标系进行换算的话，就是body.vectorlocaltoglobal
        p.CoordinateTransformation = function (reference, dis) {
            //avatar在世界坐标系的位置
            var posWorld1 = this._avatar.localToGlobal(this._avatar.body.position[0], this._avatar.body.position[1], posWorld1);
            //avatar在平衡木坐标系统的位置
            var posRef1 = reference.globalToLocal(posWorld1.x, posWorld1.y, posRef1);
            //avatar在平衡木坐标系中右移
            var posMove = new egret.Point(posRef1.x + dis, posRef1.y);
            //移动后的坐标点转换为世界坐标
            var posWorld2 = reference.localToGlobal(posMove.x, posMove.y, posWorld2);
            //转换为世界坐标之后的点转换到avatar的坐标系
            var posAvatar = this._avatar.globalToLocal(posWorld2.x, posWorld2.y, posAvatar);
            this._avatar.body.position[0] = posAvatar.x;
            this._avatar.body.position[1] = posAvatar.y;
        };
        return Role;
    })();
    Balance.Role = Role;
    egret.registerClass(Role,"Balance.Role");
})(Balance || (Balance = {}));
//# sourceMappingURL=Role.js.map