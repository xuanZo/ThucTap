

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        icon: cc.Sprite,
        speed: 20,
        stopAfterSpinCount: 0,
        spinCount: 0,
        index: 0,
        heightFrame: 0,
        isSpinComplete: true,
        //bien xd dung 
        winnerLineY: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        tailNode: {
            default: null,
            visible: false,
            type: cc.Node
        }
    },
    init: function (data, index, heightFrame) {
        this.id = data.id;
        // this.icon = data.iconSF;
        this.node.getComponent(cc.Sprite).spriteFrame = data.iconSF;
        this.index = index;
        this.heightFrame = heightFrame;
    },
    start() {
    },
    //ham de tao su kien quay
    startSpin: function () {

        this.isSpinComplete = false;
        // this.stopAfterSpinCount = 4;
        this.spinCount = 0;
        // this.tailNode = this.parent.arrayList[this.parent.arrayList.length - 1];
        // cc.log(this.tailNode)
    },
    stopSpin() {
        this.isSpinComplete = true;
    },
    spin: function () {
        // let time = 0;

        // time = Math.floor((posY + this.node.height / 2) / this.speed);
        if (this.isSpinComplete) {
            return;
        }
        if (!this.isSpinComplete) {
            if (this.spinCount > 4) {
                this.isSpinComplete = true;
                this.parent.stopAllItem();
                cc.log("index= ", this.index + " posY= ", this.node.y);
                return;
            }
            this.node.y -= this.speed;
            // this.spinCount++;    
            // cc.log(this.spinCount)        
            if (this.node.y <= -this.node.height / 2) {
                let posX = this.node.x;
                let delta = -this.node.height/2 - this.node.y;                
                let posY = this.heightFrame * 7 / 6 - delta;
                this.spinCount++;
                this.node.getComponent(cc.Sprite).spriteFrame = this.parent.setImage();
                this.node.setPosition(posX, posY);
            }

        }
        // cc.log(this.spinCount)

    },
    update(dt) {

        this.spin();

    }

});
