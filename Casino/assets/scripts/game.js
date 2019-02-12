var Reel = require("reel"),
    OnOffButton = require("on-off-button")
cc.Class({
    extends: cc.Component,

    properties: {
        //mang reels tao cac dong de cuon
        reels: {
            default: [],
            type: [Reel]
        },
        spinButton: {
            default: null,
            type: OnOffButton
        },
        autoSpinButton: {
            default: null,
            type: OnOffButton
        },
        rollingCompletedCount: {
            default: 0,
            type: cc.Integer
        },
        isAutoSpin: {
            default: false,
            visible: false
        },
        autoSpinTimer: {
            default: null,
            visible: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var that = this;
        this.spinButton.node.on('reel-spin', function (event) {
            if (event.detail.isOn) {
                that.spin();
            }
        });
        this.autoSpinButton.node.on('reel-auto-spin', function (event) {
            that.isAutoSpin === true ? that.isAutoSpin = false : that.isAutoSpin = true;
            if (that.isAutoSpin) {
                if (event.detail.isOn) {
                    that.spin();
                }
            } else {
                clearTimeout(this.autoSpinTimer);
            }
        });
    },

    start() {

    },

    // update (dt) {},
});
