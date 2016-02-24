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
            this.totalTime = 121;
            this.isWin = false;
            this._starTake = 0;
            this._starTotal = 24;
            this.starNeed = 3;
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
            this.gameUI.updateStarText(this._starTake, this.starNeed);
            this.addEventListener(Balance.EventEnum.STAR_TAKE, this.onStarTakenEvent, this);
            this.addEventListener(Balance.EventEnum.TIME_OVER, this.onTimeOverEvent, this);
            this.addEventListener(Balance.EventEnum.ROLE_FALL, this.onRoleFallEvent, this);
        };
        p.onStarTakenEvent = function (evt) {
            this._starTake = evt.data;
            console.log("!!!!!!!!!!!is taking star :" + evt.data);
            if (this.gameUI != null)
                this.gameUI.updateStarText(this._starTake, this.starNeed);
            if (this._starTake == this.starNeed) {
                this.isWin = true;
                this.stopGame();
            }
        };
        p.onRoleFallEvent = function (evt) {
            this.isWin = false;
            this.stopGame();
        };
        p.onTimeOverEvent = function (evt) {
            this.isWin = false;
            if (this._starTake == this.starNeed) {
                this.isWin = true;
            }
            this.stopGame();
        };
        p.stopGame = function () {
            this.dispatchEvent(new egret.Event(Balance.EventEnum.GAME_OVER, true, false, this));
        };
        p.onRemove = function () {
            console.log("remove gameController from stage!");
            this._starTake = 0;
            this.removeEventListener(Balance.EventEnum.STAR_TAKE, this.onStarTakenEvent, this);
            this.removeEventListener(Balance.EventEnum.TIME_OVER, this.onTimeOverEvent, this);
            this.removeEventListener(Balance.EventEnum.ROLE_FALL, this.onRoleFallEvent, this);
        };
        return GameController;
    })(Balance.DisplayObjectContainer);
    Balance.GameController = GameController;
    egret.registerClass(GameController,"Balance.GameController");
})(Balance || (Balance = {}));
//# sourceMappingURL=GameController.js.map