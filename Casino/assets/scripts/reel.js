var Num = require("randomNum");

cc.Class({
    extends: cc.Component,

    properties: {
        isLockButton: {
            default: false
        },
        //dem so lan cuon
        rollingCount: {
            default: 0,
            visible: false,
            type: cc.Integer
        },
        //mang chua diem dung de xd so lan cuon
        stops: {
            default: [],
            type: [cc.Prefab]
        },
        stop:{
            default:null,
            type:cc.Node
        },
        //mot mang cac Node se duoc tao ra tai moi diem dung duoc luu trong stops
        stopNodes: {
            default: [],
            visible: false,
            type: [cc.Node]
        },
        //nut cuoi cua cuon va se duoc cap nhat lien tuc trong moi lan cuon
        tailNode: {
            default: null,
            visible: false,
            type: cc.Node
        },
        //so luong Node duoc nhin thay tren khung chua
        visibleStop: {
            default: 3,
            visible: false,
            type: cc.Integer
        },
        //gan co cho hanh dong cuon
        isRollingCompleted: {
            default: false,
            visible: false
        },
        //moi icon se giam mot luong stepY trong moi lan cuon
        stepY: {
            default: 10,
            visible: false,
            type: cc.Integer
        },
        stopHeight: {
            default: 0,
            visible: false,
            type: cc.Integer
        },
        //thiet lap  khoang cach giua 2 item
        padding: {
            default: 0,
            type: cc.Integer

        },prngMinRange:{
            default:1,
            type:cc.Integer
        },
        //gets/sets the max value used with the PRNG class
        prngMaxRange:{
            default:1000000000,
            type:cc.Integer
        },
        winnerIndex:{
            default:0,
            visible:false,
            type:cc.Integer
        },
        winnerLineY:{
            default:0,
            type:cc.Integer,
            visible: false
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let firstStop = cc.instantiate(this.stops[0]);
        this.stopHeigth = firstStop.height;
        this.stepY = this.stopHeight / 5;
        this.padding = (this.node.height - (this.visibleStops * this.stopHeight)) / (this.visibleStops + 1);
        //luu cac node tren stops vao node reel
        var startY = this.node.height - this.padding - this.stopHeight;
        var startX = this.node.width / 2 - firstStop.width / 2;
        for (let i = 0; i <= this.stops.length; i++) {
            let stop1 = cc.instantiate(this.stop);
            let data = this.stops[i];
            this.node.addChild(stop);
            stop.setPosition((startX, startY));
            startY = startY - this.padding - this.stopHeight;
            this.stopNodes.push(stop);
        }
        this.tailNode = this.stopNodes[this.stopNodes.length - 1]
        // this.isRollingCompleted = true;
    },

    start() {

    },


    update(dt) {
        if (this.isRollingCompleted) {
            return;
        }
        for (let i = 0; i < this.stopNodes.length; i++) {
            let stop = this.stopNodes[i];
            stop.y -= this.stepY;
            if (stop.y - this.padding > this.node.height) {
                if (i + 1 == this.stopNodes.length) {
                    this.rollingCount++;
                }
                stop.y = this.tailNode.y - this.tailNode.height - this.padding;
                this.tailNode = stop;
            }
            if (this.stopAfterRollingCount == this.rollingCount && i == this.winnerIndex) {
                if (stop.y >= this.winnerLineY) {
                    if (this.winnerIndex === 0) {
                        //move the tail node before the first stop (index===0)
                        this.tailNode.y = stop.y + stop.height;
                        //this.tailNode.setPosition(cc.p(stop.x, stop.y + stop.height));
                        this.tailNode = this.stopNodes[this.stopNodes.length - 2];
                    }
                    this.resetY(stop);
                    this.isRollingCompleted = true;
                    this.node.dispatchEvent(new cc.Event.EventCustom('rolling-completed', true));
                }
            }
        }
    },
    resetY:function(){
        //do anything
    },
    spin:function(){
        var min =1;
        var max = 2;
        this.rollingCount =0;
        this.stopAfterRollingCount=Math.floor(Math.random() * (max - min + 1)) + min;
        var randomValue = Num.newValue(this.prngMinRange, this.prngMaxRange);
        this.winnerIndex = (randomValue%this.stops.length);
        this.isRollingCompleted = false;
    },
    getWinnerStop:function(){
        //returns the reel winnre index
     return this.stopNodes[this.winnerIndex];
 }
});
