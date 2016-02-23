
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/physics/physics.js",
	"bin-debug/core/DisplayObjectContainer.js",
	"bin-debug/GameController.js",
	"bin-debug/GameRunning.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MainCopy.js",
	"bin-debug/SceneContainer.js",
	"bin-debug/Star.js",
	"bin-debug/UI/GameUI.js",
	"bin-debug/core/AssistFunctions.js",
	"bin-debug/enum/EventEnum.js",
	"bin-debug/enum/GameStatusEnum.js",
	"bin-debug/enum/IDEnum.js",
	"bin-debug/physic/PhysicTest.js",
	"bin-debug/physic/PhysicTest2.js",
	"bin-debug/physic/PhysicTest3.js",
	"bin-debug/physic/PhysicTest4.js",
	"bin-debug/physic/PhysicWorld.js",
	"bin-debug/physic/p2DebugDraw.js",
	"bin-debug/player/Avatar.js",
	"bin-debug/player/Role.js",
	"bin-debug/player/playerEnum.js",
	"bin-debug/GameStart.js",
	"bin-debug/GameOver.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};