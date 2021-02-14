window.onload=function ()
{
    var config = {
        type: Phaser.AUTO,
        width: 800 ,
        height: 600,
        parent: 'phaser-game',
        scene: [MainScreenScene,GalleryScene,QuizScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
    };
    game = new Phaser.Game(config);
}

