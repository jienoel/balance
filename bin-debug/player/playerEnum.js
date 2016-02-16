var Balance;
(function (Balance) {
    /**
     *
     * @author
     *
     */
    var playerEnum = (function () {
        function playerEnum() {
        }
        var d = __define,c=playerEnum;p=c.prototype;
        //status
        playerEnum.STATE_NULL = -1; //Avatar未添加，属于休眠状态
        playerEnum.STATE_ACTIVE = 0; //Avatar添加到舞台，但是没有指定动作
        playerEnum.STATE_IDLE = 1;
        playerEnum.STATE_WALK = 2;
        //player role
        playerEnum.ROLE_PRINCESS = 100;
        playerEnum.ROLE_BOY = 101;
        playerEnum.ROLE_DUCK = 102;
        return playerEnum;
    })();
    Balance.playerEnum = playerEnum;
    egret.registerClass(playerEnum,"Balance.playerEnum");
})(Balance || (Balance = {}));
//# sourceMappingURL=playerEnum.js.map