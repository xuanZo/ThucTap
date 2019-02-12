
cc.Class({
    extends: cc.Component,

    properties: {
        //thiet lap ten su kien trong khi nuts duoc chon
        mouseDownName: {
            default: "on-off-mousedown"
        },
        //thiet lap sprite button
        sprite: {
            default: null,
            type: cc.Sprite
        },
        spriteTextureDownUrl: {
            default: null,
            type: cc.Texture2D
        },
        //gets/sets the on status
        isOn: {
            default: false
        },
        //PRIVATE PROPERTIES
        //gets/sets the texture for the off status
        spriteTextureUp: {
            default: null,
            visible: false,
            type: cc.Texture2D
        },
        //gets/sets the cached texture for the off status
        spriteTextureDown: {
            default: null,
            visible: false,
            type: cc.Texture2D
        },
        //gets/sets the locked status. If its value is true no actions will be performed on the touch event
        isLocked: {
            default: false,
            visible: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //sets the texture for on/off
        var that = this;
        this.spriteTextureUp = this.sprite._spriteFrame._texture;
        this.spriteTextureDown = cc.textureCache.addImage(this.spriteTextureDownUrl);        
        //defines and sets the touch function callbacks
        function onTouchDown(event) {
            that.onOff();
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    },

    start() {
        if (this.isOn) {
            //if we want to activate the button on the start-up
            //we need to invert the initial status(flag): see onOff function
            this.isOn = false;
            this.onOff();
        }
    },
    onOff: function () {
        //updates the texture for the on/off status
        if (this.isLocked) {
            return;
        }

        if (this.isOn) {
            //set to off
            this.updateSpriteFrame(this.sprite, this.spriteTextureUp);
            this.isOn = false;
        } else {
            //set to on
            this.updateSpriteFrame(this.sprite, this.spriteTextureDown);
            this.isOn = true;
        }
        //emits the event
        this.node.emit(this.mouseDownName, {
            isOn: this.isOn
        });
    },
    reset: function () {
        this.isOn = false;
        this.isLocked = false;
        this.updateSpriteFrame(this.sprite, this.spriteTextureUp);
    },
    updateSpriteFrame: function (sprite, texture) {
        if (!sprite || !texture) {
            return;
        }
        let w = sprite.node.width,
            h = sprite.node.height,
            frame = new cc.SpriteFrame(texture, cc.rect(0, 0, w, h));
        sprite.spriteFrame = frame;

    }
    // update (dt) {},
});
// cc._RFPop();
