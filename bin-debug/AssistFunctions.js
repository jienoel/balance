/**
     *
     * @author ChenJie
     *
     */
var AssistFunctions = (function () {
    function AssistFunctions() {
    }
    var d = __define,c=AssistFunctions;p=c.prototype;
    /**
* 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
* Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
*/
    AssistFunctions.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return AssistFunctions;
})();
egret.registerClass(AssistFunctions,"AssistFunctions");
//# sourceMappingURL=AssistFunctions.js.map