"use strict";
cc._RF.push(module, '0136aOotAxG/JNg/oS69K5O', 'Loading');
// scripts/Loading.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 10,
        anim: {
            default: null,
            type: cc.Animation
        },
        bar: {
            default: null,
            type: cc.ProgressBar
        }
    },
    onLoad: function onLoad() {
        this.bool = true;
        var animState = this.anim.play('cc');
        // 设置循环模式为 Loop
        animState.wrapMode = cc.WrapMode.Loop;
        cc.log("load..onload", this.bar);
        //if (this.bar.progress) {
        this.bar.progress = 0;
        // }
    },

    update: function update(dt) {
        this._updateProgress(this.bar, dt);
    },
    _updateProgress: function _updateProgress(ProgressBar, dt) {

        var pro = ProgressBar.progress;
        //cc.log("load..pro", pro);
        if (pro < 1.0) {
            pro += this.speed * dt;
        } else {
            if (this.bool) {
                this.bool = false;
                cc.director.loadScene('game');
                // cc.director.preloadScene('game', function () {
                //     cc.log("Next scene preloaded");
                //     //cc.director.loadScene('game');
                // });
            }
        }
        this.bar.progress = pro;
    }

    // update (dt) {},
});

cc._RF.pop();