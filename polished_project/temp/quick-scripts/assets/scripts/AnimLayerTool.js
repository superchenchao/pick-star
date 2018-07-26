(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/AnimLayerTool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '085c9KpgYdPn6UmjQwVowTq', 'AnimLayerTool', __filename);
// scripts/AnimLayerTool.js

"use strict";

var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var AnimLayerTool = {
    moveButtonAnimTime: 0.3, // 按钮动画移动时间
    bottonAnim: function bottonAnim(button) {
        // 创建按钮特效
        var arrayNode = new Array();
        if (button.length == undefined) {
            arrayNode[0] = button;
        } else {
            arrayNode = button;
        }
        for (var i = 0; i < arrayNode.length; i++) {
            var time = cc.random0To1() * 5 + 1;
            var width = arrayNode[i].height / 20.0;
            var anim1 = cc.jumpBy(time, cc.p(width, 0), width, 1);
            var anim2 = cc.jumpBy(time, cc.p(-width, 0), -width, 1);
            var anim3 = cc.scaleBy(0.3, 1.1, 0.9);
            var anim4 = cc.delayTime(time);
            var actions = cc.sequence(anim1, anim2, anim3, anim3.reverse(), anim4);
            arrayNode[i].runAction(actions.repeatForever());
        }
    },
    createShowMessageBox: function createShowMessageBox(x, y, name, rotation, parentNode) {
        var messageBack = new cc.Node();
        messageBack.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("messageBox0");
        messageBack.setPosition(x, y);
        messageBack.rotation = rotation;
        messageBack.opacity = 0;
        parentNode.addChild(messageBack);
        var message = new cc.Node();
        message.setPosition(0, 30);
        if (name.indexOf("messageBox") != -1) {
            message.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(name);
        } else {
            var lableNode = new cc.Node();
            var lable = lableNode.addComponent(cc.Label);
            lable.string = name;
            lable.fontSize = 30;
            lable.overflow = cc.Label.Overflow.CLAMP;
            lable.enableWrapText = true;
            lable.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            lable.verticalAlign = cc.Label.VerticalAlign.CENTER;
            lableNode.width = 220;
            lableNode.height = 300;
            message.addChild(lableNode);
        }
        messageBack.addChild(message);
        var action1 = cc.fadeIn(0.2);
        var action2 = cc.delayTime(1);
        var action3 = cc.fadeOut(0.2);
        var moveFinish = cc.callFunc(this.callFuncAddScore, this, messageBack);
        var action4 = cc.sequence(action1, action2, action3, moveFinish);
        messageBack.runAction(action4);
    },
    callFuncAddScore: function callFuncAddScore(sender, node) //创建加分动画监听
    {
        sender.destroy();
    },
    createPopStarAnim: function createPopStarAnim(from, dTime) //创建卡片爆炸特效
    {
        var moveFinish2 = cc.callFunc(this.callFuncPopStarAnim, this, from);
        from.runAction(cc.sequence(cc.delayTime(dTime), moveFinish2, cc.fadeOut()));
    },
    callFuncPopStarAnim: function callFuncPopStarAnim(sender, from) //卡片爆炸特效监听
    {
        // GameTools.playSimpleAudioEngine(0);
        var emitterNode = new cc.Node();
        emitterNode.setPosition(from.getPosition());
        var move_emitter = emitterNode.addComponent(cc.ParticleSystem);
        move_emitter.texture = "res/raw-assets/resources/stars.png";
        switch (from.number) {
            case 0:
                move_emitter.startColor = cc.color(255, 226, 0);
                break;
            case 1:
                move_emitter.startColor = cc.color(235, 110, 165);
                break;
            default:
                move_emitter.startColor = cc.color(253, 44, 129);
                break;
        }
        move_emitter.startColorVar = cc.color(0, 0, 0, 0);
        move_emitter.endColorVar = cc.color(0, 0, 0, 0);
        move_emitter.endColor = move_emitter.startColor;
        move_emitter.autoRemoveOnFinish = true;

        move_emitter.duration = 0.1;
        move_emitter.emissionRate = 200;
        move_emitter.life = 2;
        move_emitter.lifeVar = 0.5;
        move_emitter.angle = 90;
        move_emitter.angleVar = 360;
        move_emitter.custom = true;
        move_emitter.playOnLoad = true;
        from.getParent().addChild(emitterNode);
        from.active = false;
    }
};

module.exports = AnimLayerTool;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AnimLayerTool.js.map
        