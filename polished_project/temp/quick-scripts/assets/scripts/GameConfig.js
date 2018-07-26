(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dc1f9Hun/RIAIsu+H1LSFdF', 'GameConfig', __filename);
// scripts/GameConfig.js

"use strict";

var GameConfig = {
    GameClubButton: null, //游戏圈按钮
    GameScene: null,

    DEVICE_WIDTH: 960, // 屏幕宽度
    DEVICE_HEIGHT: 640,

    MAIN_MENU_NUM: "Classic", // 主选择菜单

    GameCore: 0, //游戏得分
    GameHeightScore: 0, //游戏最高分

    IS_GAME_MUSIC: true, // 游戏音效

    IS_GAME_SHARE: false, // 游戏分享
    IS_GAME_START: false, //游戏是否开始
    IS_GAME_OVER: false // 游戏是否结束
};
module.exports = GameConfig;

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
        //# sourceMappingURL=GameConfig.js.map
        