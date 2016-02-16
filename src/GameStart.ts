/**
	 *
	 * @author ChenJie
	 *
	 */
class GameStart extends Balance.DisplayObjectContainer{
        
    private seesaw: egret.Bitmap;
    private princess: Balance.Role;
    
    public constructor() {
        super();
    }
    
    public onInit()
    { 
        var scene: Balance.SceneContainer = new Balance.SceneContainer();
        scene.name = "scene";
        this.addChild(scene);
        scene.addEventListener("sceneClick",this.onSceneClick,this);
        
        this.seesaw = AssistFunctions.createBitmapByName("seesaw");
        this.seesaw.anchorOffsetX = this.seesaw.width / 2;
        scene.addChild(this.seesaw);
        
        this.seesaw.x = 530;
        this.seesaw.y = 385;
        
        this.princess = new Balance.Role(Balance.playerEnum.ROLE_PRINCESS);
        this.princess.addToStage(scene);
        this.princess.x = 81;
        this.princess.y = 300;
    
        console.log("seesaw location:" + this.seesaw.x + "," + this.seesaw.y);
    }
    
    private onSceneClick(evt:egret.Event)
    { 
        var e: egret.TouchEvent = evt.data as egret.TouchEvent;
     //   this.seesaw.x = e.localX;
     //   this.seesaw.y = e.localY;
        var left: boolean = e.localX <= this.princess.x ? true : false;
        this.princess.move(left);
        console.log("touching......" + this.princess.x + "   " + this.princess.y);
    }
}
