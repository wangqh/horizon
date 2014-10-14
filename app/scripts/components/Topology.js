var Topology = function (options) {
    this.box = new ElementBox();
    this.network = demo.Util.createDraggableNetwork();
    /*this.alarmTable = new Table();
    this.alarmTablePane = new TablePane(this.alarmTable);
    this.isInitAlarmTable = false;*/
    this.options = options;
};
twaver.Util.ext('Topology', Object, {
    init: function () {
        //var alarmOverview = new demo.AlarmOverview(this.box);
        var toolbar = demo.Util.createNetworkToolbar(this.network);
        var mainPane = new BorderPane(this.network, toolbar);
        mainPane.setTopHeight(25);
        this.registImages();
        demo.Util.appendChild(mainPane.getView(), this.options.renderTo, 0, 0, 0, 0);

        window.onresize = function (e) { mainPane.invalidate(); };

        this.initBox();
        this.network.setZoom(1);
        this.network.setElementBox(this.box);
        if (!twaver.Util.isTouchable) {
            this.network.setInteractions([
						new twaver.network.interaction.SelectInteraction(this.network),
                        new twaver.network.interaction.DefaultInteraction(this.network)
            ]);
        }

    },
    registImages: function () {
        this.registerImage("/images/topology/center.png");
        this.registerImage("/images/topology/gather.png");
        this.registerImage("/images/topology/server.png");
        this.registerImage("/images/topology/wanjet.png");
        this.registerImage("/images/topology/wanjet2.png");
        this.registerImage("/images/topology/security.svg");
    },
    registerImage: function (url) {
        demo.Util.registerImage(url, this.network);
    },
    initBox: function () {
        var networkDom = this.options.renderTo;
        var cp = networkDom.scrollWidth/2;
        var _gutter = 50;
        var topologyData = this.options.data;
        var wan = this.createNode("公网", "subnetwork_image", cp-32, 35, 'center');
        var security = this.createNode('防火墙', "security", cp-77, 109, 'right.right');
        var wanjet1 = this.createNode('交换机', "wanjet", cp-53.5, 180, 'right.right');
        var gather1 = this.createNode(null, "gather", cp-10.5, 230);


        this.createLink(wan, security);
        this.createLink(security, wanjet1);
        this.createLink(wanjet1, gather1);

        var that = this;


        topologyData.routers.forEach(function(val, key){
            var routerLength = topologyData.routers.length;
            var routerPos = returnAutoPosition(key, 26);
            var router = that.createNode(val.name, 'center', routerPos.x, routerPos.y, 'right.right', val.id ? '/horizon/networks/routers/' + val.id : null, 26, 26);
            if(routerLength%2 && key == 0){
                that.createLink(gather1, router);
            } else {
                that.createShapeLink(gather1, router, {x: routerPos.x+13, y: 240.5})
            }
            if(!!val.subnet){
                var subnetPos = {x: routerPos.x+13-46, y: 330};
                var subnet = that.createNode(val.subnet.name, 'wanjet2', subnetPos.x, subnetPos.y, 'right.right', val.subnet.id ?  '/horizon/networks/vxnets/' + val.subnet.id : null, 92, 14);
                that.createLink(router, subnet);

                if(!!val.subnet.instances){
                    var gather2 = that.createNode(null, "gather", subnetPos.x+46-10.5, 380);
                    that.createLink(subnet, gather2);
                    val.subnet.instances.forEach(function(instanceData, index){
                        var instanceLength = val.subnet.instances.length;
                        var instancePos = returnPosition(_gutter, subnetPos.x+46, 430, 21, instanceLength, index);
                        var instance = that.createNode(instanceData.name, 'server', instancePos.x, instancePos.y, null, instanceData.id ? '/horizon/instances/' + instanceData.id : null, 21, 51);
                        if(instanceLength%2 && index == 0){
                            that.createLink(gather2, instance);
                        } else {
                            that.createShapeLink(gather2, instance, {x: instancePos.x+10.5, y: 380+10.5})
                        }
                    })
                }

            }
        });


        function returnPosition(gutter, cp, y, width, length, index){
            var x = cp;
            var halfW = width/2;
            if(length%2){ //奇数个
                x = index%2 ? (cp - halfW - (index+1)/2*gutter) : (cp - halfW + index/2*gutter);
            } else{ //偶数个
                x = index%2 ? (cp - halfW + index/2*gutter) : (cp - halfW - (index+1)/2*gutter);
            }
            return { x: x, y: y };
        }

        function returnAutoPosition(key, imgWidth){
            var routerLength = topologyData.routers.length;
            var instanceLength = topologyData.routers[key].subnet.instances ? topologyData.routers[key].subnet.instances.length : 0;
            instanceLength = instanceLength<2 ? 2 : instanceLength;
            var gutterNum = instanceLength/2 + 0.5;
            var x = cp;
            topologyData.routers.forEach(function(router, index){
                if(index < key){
                    var _length = !router.subnet.instances || router.subnet.instances.length < 2 ? 2 : router.subnet.instances.length;
                    if(routerLength%2){//奇数个
                        if(key>2 && index>0){
                            if(key%2){
                                gutterNum += (index%2 ? _length + 1 : 0);
                            } else {
                                gutterNum += (index%2 ? 0 : _length + 1);
                            }
                        }
                    } else{
                        if(key>1){
                            if(key%2){
                                gutterNum += (index%2 ? _length + 1 : 0);
                            } else {
                                gutterNum += (index%2 ? 0 : _length + 1);
                            }
                        }
                    }
                }
            });

            if(routerLength%2){//奇数个
                if(key != 0){
                    gutterNum += (topologyData.routers[0].subnet.instances.length+1)/2;
                    x = key%2 ? cp - _gutter * gutterNum : cp + _gutter * gutterNum;
                }
            } else {
                x = key%2 ? cp + _gutter * gutterNum : cp - _gutter * gutterNum;
            }



            return {x: x - imgWidth/2 , y: 280};
        }




    },
    createNode: function (name, image, x, y, position, url, width, height) {
        if (!position) {
            position = 'bottom.bottom';
        }
        if(url){
            var a = document.createElement('a');
            a.href =  url;
            //a.target = '_blank';
            a.style.width = width + 'px';
            a.style.height = height + 'px';
            demo.Util.appendChild(a, this.network.getView(), y, null, null, x);
        }

        var node = new Node(name);
        //var networkDom = this.network.getView();
        var _name = name && name.length > 3 ? name.substring(0, 3) + '...' : name;
        node.setName(_name);
        node.setToolTip('<b>' + name + '</b>');
        node.setImage(image);
        node.setStyle('label.position', position);
        node.setStyle('label.color', '#000000');
        node.setLocation(x, y);
        this.box.add(node);
        return node;
    },
    createLink: function (fromNode, toNode, direction) {
        if (!direction) {
            direction = 'right';
        }
        var link = new Link(fromNode, toNode);
        this.box.add(link);
        return link;
    },
    createShapeLink: function (fromNode, toNode, point) {

        var link = new twaver.ShapeLink(fromNode, toNode);
        link.addPoint(point);
        this.box.add(link);
        return link;
    }
});