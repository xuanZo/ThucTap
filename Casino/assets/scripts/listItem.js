var Item = cc.Class({
    name: 'Item',
    properties: {
        id: 0,
        iconSF: cc.SpriteFrame,
        // name: ""
    }
});
cc.Class({
    extends: cc.Component,

    properties: {

        items: {    //chua mot mang cac items
            default: [],
            type: Item
        },
        itemNode: {
            default: null,
            type: cc.Node
        },
        btnSpin: {
            default: null,
            type: cc.Button,
        },
        duration: 10,
        //thiet lap mang se hien thi ngay diem dung
        stopNodes: {
            default: [],
            type: [cc.Node],
            visible: false
        },
        //Thiet lap so diem dung se duoc nhin thay tren man hinh
        visibleStops: {
            default: 3,
            visible: false,
            type: cc.Integer
        },
        tailNode: {
            default: null,
            type: cc.Node
        }
    },
    init: function () {
        this.arrayList = [];

    },
    //ham lay danh sach item
    getList: function () {
        let listItemSave = [];//Mang luu danh sach Item        
        let w = this.node.width;
        let h = this.node.height;
        for (let i = 0; i < 20; i++) {
            let item = cc.instantiate(this.itemNode);
            let index = Math.floor(Math.random() * 15);
            let data = this.items[index];
            this.node.addChild(item);
            item.setPosition(w / 5 * (i % 5) + w / 10, h / 3 * Math.floor(i / 5) + h / 6);
            item.getComponent('ItemTemplate').init(data, i,this.node.height);
            item.getComponent('ItemTemplate').parent = this
            listItemSave.push(item);
        }
        this.tailNode = listItemSave[listItemSave.length - 1];
        return listItemSave;
    },
    //tao su kien quay
    spinEvent: function () {
        this.arrayList.forEach(item => {
            item.getComponent('ItemTemplate').startSpin();
        });
    },
    
    //cap nhat anh moi moi node khi node den bien
    setImage: function () { 
        let item;       
        let temp = this.items[Math.floor(Math.random() * 15)];
        item = temp.iconSF;
        return item;
    },
    onLoad() {
        this.init();
        this.arrayList = this.getList();
    },

    start() {
    },
    update(dt) {
        // this.arrayList=this.getList();
    }


});
