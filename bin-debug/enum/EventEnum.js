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
        EventEnum.GAME_START = "game_start";
        EventEnum.GAME_OVER = "game_over";
        EventEnum.GAME_RESTART = "game_restart";
        EventEnum.STAR_DESTROY = "star_destroy";
        EventEnum.STAR_TAKE = "star_taken";
        return EventEnum;
    })();
    Balance.EventEnum = EventEnum;
    egret.registerClass(EventEnum,"Balance.EventEnum");
})(Balance || (Balance = {}));
