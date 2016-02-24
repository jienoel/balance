var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var GameStatusEnum = (function () {
        function GameStatusEnum() {
        }
        var d = __define,c=GameStatusEnum;p=c.prototype;
        GameStatusEnum.INIT = -1;
        GameStatusEnum.START = 0;
        GameStatusEnum.RUNNING = 10;
        GameStatusEnum.WIN = 20;
        GameStatusEnum.FAIL = 21;
        return GameStatusEnum;
    })();
    Balance.GameStatusEnum = GameStatusEnum;
    egret.registerClass(GameStatusEnum,"Balance.GameStatusEnum");
})(Balance || (Balance = {}));
//# sourceMappingURL=GameStatusEnum.js.map