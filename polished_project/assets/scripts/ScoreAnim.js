cc.Class({
    extends: cc.Component,

    init (scoreFX) {
        this.scoreFX = scoreFX;
    },

    hideFX: function () {
        cc.log("ani,,,,,hideFX,,,,,,,,,,,,,,");
        this.scoreFX.despawn();
    },
});