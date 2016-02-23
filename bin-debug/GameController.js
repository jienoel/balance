var Balance;
(function (Balance) {
    /**
     *
     * @author ChenJie
     *
     */
    var GameController = (function (_super) {
        __extends(GameController, _super);
        function GameController() {
            _super.call(this);
            this.totalTime = 120;
            this.isWin = false;
            this._starTake = 0;
            this._starTotal = 24;
        }
        var d = __define,c=GameController;p=c.prototype;
        p.onInit = function () {
            this.gameRunning = new GameRunning();
            this.gameRunning.delayTime = 5000;
            this.gameRunning.maxStarCount = this._starTotal;
            this.addChild(this.gameRunning);
            this.gameUI = new Balance.GameUI();
            this.addChild(this.gameUI);
            this.gameUI.totalTime = this.totalTime;
            this.gameUI.state = Balance.GameStatusEnum.RUNNING;
            this.gameUI.updateStarText(this._starTake, this._starTotal);
            this.addEventListener(Balance.EventEnum.STAR_TAKE, this.onStarTakenEvent, this);
        };
        p.onStarTakenEvent = function (evt) {
            this._starTake = evt.data;
            console.log("!!!!!!!!!!!is taking star :" + evt.data);
            if (this.gameUI != null)
                this.gameUI.updateStarText(this._starTake, this._starTotal);
        };
        p.stopGame = function () {
            this.gameRunning.destroy();
            this.dispatchEvent(new egret.Event(Balance.EventEnum.GAME_OVER, true, false, this));
        };
        return GameController;
    })(Balance.DisplayObjectContainer);
    Balance.GameController = GameController;
    egret.registerClass(GameController,"Balance.GameController");
})(Balance || (Balance = {}));
