var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var EventEnum = (function () {
        function EventEnum() {
        }
        var d = __define,c=EventEnum;p=c.prototype;
        EventEnum.GAME_START = "game_start"; //游戏开始
        EventEnum.GAME_OVER = "game_over"; //游戏结束，胜负的判断根据GameController类中的isWin参数判断
        EventEnum.GAME_RESTART = "game_restart"; //游戏结束之后重新开始
        EventEnum.STAR_DESTROY = "star_destroy"; //星星被吃，或者落在跷跷板上后消失
        EventEnum.STAR_TAKE = "star_taken"; //吃到星星
        EventEnum.TIME_OVER = "time_over"; //倒计时时间到
        EventEnum.ROLE_FALL = ""; //人从跷跷板跌倒
        return EventEnum;
    })();
    Balance.EventEnum = EventEnum;
    egret.registerClass(EventEnum,"Balance.EventEnum");
})(Balance || (Balance = {}));
//# sourceMappingURL=EventEnum.js.map