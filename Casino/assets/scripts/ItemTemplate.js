

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
        let max = 5;
        let min = 1;
        this.isSpinComplete = !this.isSpinComplete;
        this.stopAfterSpinCount = 4;
        this.spinCount = 0;
        this.tailNode = this.parent.arrayList[this.parent.arrayList.length - 1];
        // cc.log(this.tailNode)
    },
    spin: function () {
        // let time = 0;
        let posX = this.node.x;
        let posY = this.heightFrame / 3 * Math.floor(19 / 5) + this.heightFrame / 6;
        // time = Math.floor((posY + this.node.height / 2) / this.speed);
        if (this.isSpinComplete) {
            return;
        }
        if (!this.isSpinComplete) {

            this.node.y -= this.speed;
            this.spinCount++;    
            // cc.log(this.spinCount)        
            if (this.node.y <= -this.node.height / 2) {                
                this.node.getComponent(cc.Sprite).spriteFrame = this.parent.setImage();
                this.node.setPosition(posX,posY);
            }
            if (this.spinCount == 128) {
                this.isSpinComplete = true;
                cc.log("index= ", this.index + " posY= ", this.node.y);
            }
        }
        // cc.log(this.spinCount)

    },
    update(dt) {

        this.spin();

    }

});
