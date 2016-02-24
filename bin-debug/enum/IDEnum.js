var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var IDEnum = (function () {
        function IDEnum() {
        }
        var d = __define,c=IDEnum;p=c.prototype;
        IDEnum.SEESAW_ID = 1;
        IDEnum.TRIANGLE_ID = 2;
        IDEnum.LEFTBORDER_ID = 3;
        IDEnum.RIGHTBORDER_ID = 4;
        IDEnum.BOY_ID = 10;
        IDEnum.PRINCESS_ID = 11;
        IDEnum.STAR_BEGIN_ID = 100;
        IDEnum.STAR_END_ID = 1000;
        return IDEnum;
    })();
    Balance.IDEnum = IDEnum;
    egret.registerClass(IDEnum,"Balance.IDEnum");
})(Balance || (Balance = {}));
//# sourceMappingURL=IDEnum.js.map