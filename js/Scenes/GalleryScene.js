class GalleryScene extends Phaser.Scene {

    constructor() {
        super('GalleryScene');
    }

    init(){
        this.cameras.main.setBackgroundColor('#6cb2f3')
        this.add.text(340,300,"A carregar...");
    }

    preload() {
        this.load.spritesheet('flags', 'images/galeria/bandeiras/paises.png', {
            frameWidth: 75,
            frameHeight: 75
        });

        this.load.spritesheet('voltar','images/buttons/setas_voltar.png',{
            frameWidth: 174,
            frameHeight: 127,
        })

        this.load.spritesheet('arrows-left', 'images/buttons/setas_esquerda.png', {
            frameWidth: 344,
            frameHeight: 249
        });

        this.load.spritesheet('arrows-right', 'images/buttons/setas_direita.png', {
            frameWidth: 345,
            frameHeight: 249
        });
        for (let i = 0; i < 32; i++) {
            this.load.image('card' + i, 'images/galeria/card' + i + '.jpg');
            this.load.audio('audio-anthem' + i, 'sound/Countries/' + i + '.mp3');
            this.load.image('map' + i, 'images/galeria/maps/' + i + '.jpg');
        }

        this.load.audio('audio-theme','sound/main_theme.wav');

    }

    create() {
        //define the objects
        let themeMusic = this.sound.get();
        let hino;
        console.log(themeMusic);
        //maps
        let maps = this.add.image(0, 0, 'map0');
        maps.setOrigin(0, 0);
        maps.setDisplaySize(800, 600);

        //btn_voltar
        let btnVoltar = this.add.sprite(40,30,'voltar').setInteractive({useHandCursor: true});
        btnVoltar.setScale(0.5);

        //flags
        let flags = this.add.sprite(this.sys.canvas.width / 2 - 37, 20, 'flags').setInteractive(
            {useHandCursor: true}
        );
        flags.setOrigin(0, 0);
        flags.setFrame(0);


        //setas-esquerda
        let arrowsLeft = this.add.sprite(280, 17, 'arrows-left').setInteractive({useHandCursor: true});
        arrowsLeft.setOrigin(0, 0);
        arrowsLeft.setFrame(0);
        arrowsLeft.setScale(0.3);

        //setas-direita
        let arrowsRight = this.add.sprite(420, 17, 'arrows-right').setInteractive({useHandCursor: true});
        arrowsRight.setOrigin(0, 0);
        arrowsRight.setFrame(0);
        arrowsRight.setScale(0.3);

        //card
        const card = this.add.image(this.sys.canvas.width + 400, 350, 'card0').setAlpha(0);

        let count = 0;

        btnVoltar.on('pointerover',function (){
            btnVoltar.setFrame(1);
        });


        btnVoltar.on('pointerout', function (pointer) {
            btnVoltar.setFrame(0);
        });

        btnVoltar.on('pointerdown',function (){
            if (card.alpha) {
                hino.stop();
                themeMusic.play();
            }
           this.scene.start('MainScreenScene');
        },this);

        arrowsRight.on('pointerover', function (pointer) {
            arrowsRight.setFrame(1);
        });

        arrowsRight.on('pointerout', function (pointer) {
            arrowsRight.setFrame(0);
        });

        arrowsLeft.on('pointerover', function (pointer) {
            arrowsLeft.setFrame(1);
        });

        arrowsLeft.on('pointerout', function (pointer) {
            arrowsLeft.setFrame(0);
        });


        arrowsLeft.on('pointerdown', function () {
            count = count ? --count : 31;
            maps.setTexture('map' + count);
            flags.setFrame(count);
            if (card.alpha) {
                hino.stop()
                hino = this.scene.sound.add('audio-anthem'+count, {loop: true});
                hino.play();
                this.scene.animateCard(card, count, 1200, true);
            }
        });

        arrowsRight.on('pointerdown', function () {
            count = count < 31 ? ++count : 0;
            maps.setTexture('map' + count);
            flags.setFrame(count);
            if (card.alpha){
                hino.stop()
                hino= this.scene.sound.add('audio-anthem'+count, {loop: true});
                hino.play();
                this.scene.animateCard(card, count, -400,true);
            }
        });

        flags.on('pointerover', function () {
            flags.setAlpha(0.7);
        })

        flags.on('pointerout', function () {
            flags.setAlpha(1);
        })


        flags.on('pointerdown', function () {
            if (!card.alpha){
                card.setAlpha(1);
                card.setX(1200);
                this.scene.animateCard(card, count, 400, true);
                themeMusic.pause();
                hino = this.scene.sound.add('audio-anthem'+count, {loop: true});
                hino.play();
            }
            else{
                this.scene.animateCard(card,count, 1200, false);
                hino.stop();
                themeMusic.play();
            }
        })
    }

    animateCard(card, index, x, isOppening) {
        if (x == 400)
            card.setTexture('card' + index);
        const tween = this.tweens.add({
            targets: card,
            x: x,
            ease: Phaser.Math.Easing.Expo.InOut,
            duration: 500
        });

        tween.on('complete', function () {
            card.setTexture('card' + index);
            if (!isOppening)
                card.setAlpha(0);

            if (x < 0) {
                card.setX(this.parent.scene.sys.canvas.width + 400);
                this.parent.scene.tweens.add({
                    targets: card,
                    x: 400,
                    ease: Phaser.Math.Easing.Expo.InOut,
                    duration: 500
                });
            } else if (x == 1200) {
                card.setX(-400);
                this.parent.scene.tweens.add({
                    targets: card,
                    x: 400,
                    ease: Phaser.Math.Easing.Expo.InOut,
                    duration: 500
                });
            }
        });
    }

    update() {
    }
}


/*
    SetFlipX e SetFlipY
 */
