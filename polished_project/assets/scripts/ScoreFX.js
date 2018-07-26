cc.Class({
    extends: cc.Component,

    properties: {
        anim: {
            default: null,
            type: cc.Animation
        }
    },

    init (game) {
        cc.log("scoreFX init,,,,,,,,,,,,,,,,,");
        this.game = game;
        this.anim.getComponent('ScoreAnim').init(this);
    },

    despawn () {
        cc.log("scoreFX despawn............")
        this.game.despawnScoreFX(this.node);
    },

    play: function () {
        this.anim.play('score_pop');
    }
});
