(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c10bbPdGYhDWaLoKLV38bHf', 'Player', __filename);
// scripts/Player.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 辅助形变动作时间
        squashDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        // 跳跃音效资源
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }

    },
    init: function init() {},

    // use this for initialization
    onLoad: function onLoad() {
        cc.log("player onLoad................");
        this.enabled = false;
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        // screen boundaries
        this.minPosX = -this.node.parent.width / 2;
        this.maxPosX = this.node.parent.width / 2;

        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on('touchstart', this.onTouchStart, this);
        touchReceiver.on('touchend', this.onTouchEnd, this);

        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDestroy: function onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off('touchstart', this.onTouchStart, this);
        touchReceiver.off('touchend', this.onTouchEnd, this);
    },
    onDeviceMotionEvent: function onDeviceMotionEvent(event) {
        var acc = event.acc;
        //cc.log(event, "event..........");
        //cc.log(acc,"acc..........");
        if (acc.x > 0) {
            this.accLeft = false;
            this.accRight = true;
        } else if (acc.x < 0) {
            this.accLeft = true;
            this.accRight = false;
        }
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.accLeft = true;
                this.accRight = false;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.accLeft = false;
                this.accRight = true;
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.accLeft = false;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.accRight = false;
                break;
        }
    },
    onTouchStart: function onTouchStart(event) {
        console.log("触摸开始，，，，，，，，，，，，，");
        var touchLoc = event.getLocation();
        //console.log(touchLoc);
        if (touchLoc.x >= cc.winSize.width / 2) {
            //console.log("没进来》》》》》》》》》")
            this.accLeft = false;
            this.accRight = true;
        } else {
            //console.log("没进来》》》222》》》》》》")
            this.accLeft = true;
            this.accRight = false;
        }
    },
    onTouchEnd: function onTouchEnd(event) {
        this.accLeft = false;
        this.accRight = false;
    },


    setJumpAction: function setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 形变
        var squash = cc.scaleTo(this.squashDuration, 1, 0.6);
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1);
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(squash, stretch, jumpUp, scaleBack, jumpDown, callback));
    },

    playJumpSound: function playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    getCenterPos: function getCenterPos() {
        var centerPos = cc.v2(this.node.x, this.node.y + this.node.height / 2);
        return centerPos;
    },

    startMoveAt: function startMoveAt(pos) {
        cc.log("startMoveAt......");
        this.enabled = true;
        this.xSpeed = 0;
        this.node.setPosition(pos);
        this.node.runAction(this.setJumpAction());
    },

    stopMove: function stopMove() {
        this.node.stopAllActions();
    },

    // called every frame
    update: function update(dt) {
        // console.log("this.accLeft",this.accLeft);
        // console.log("this.accRight", this.accRight);

        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;

        // limit player position inside screen
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
            this.xSpeed = 0;
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            this.xSpeed = 0;
        }
    }
});

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
        //# sourceMappingURL=Player.js.map
        