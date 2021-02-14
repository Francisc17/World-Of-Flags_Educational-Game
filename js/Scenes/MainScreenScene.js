let bandeira;

class MainScreenScene extends Phaser.Scene {

    constructor() {
        super('MainScreenScene');
    }

    preload()
    {
        /*
            load images or sounds
        */

        this.load.spritesheet('background','images/tela_inicial/menus.png',{
            frameWidth: 800,
            frameHeight: 600,
        });


        this.load.spritesheet('btns-jogar','images/tela_inicial/spritesheet_btn_jogar.png',{
            frameWidth: 415,
            frameHeight: 153,
        });

        this.load.spritesheet('btns-galeria','images/tela_inicial/spritesheet_btn_galeria.png',{
            frameWidth: 415,
            frameHeight: 153,
        });

        this.load.audio('audio-theme','sound/main_theme.wav');
    }

    create() {

        /*
            DEFINE OBJECTS
        */

        //background
        let background = this.add.sprite(400,300,'background');

        let themeMusic =  this.sound.get();

        //music theme
        if (themeMusic === null){
            let themeMusic = this.sound.add('audio-theme', {loop: true});
            themeMusic.play();
        }
        //descomentar linha de baixo para tocar banda sonora de fundo


        //btns jogar
        let btnJogar = this.add.sprite(80,500,'btns-jogar').setInteractive({useHandCursor: true});
        btnJogar.setOrigin(0,0);
        btnJogar.setScale(0.4);
        btnJogar.on('pointerover',function(){
            btnJogar.setFrame(1);
        })

        btnJogar.on('pointerout',function(){
            btnJogar.setFrame(0);
        })



        //btns Galeria
        let btnGaleria = this.add.sprite(520,500,'btns-galeria').setInteractive({useHandCursor: true});
        btnGaleria.setOrigin(0,0);
        btnGaleria.setScale(0.4);

        btnGaleria.on('pointerover',function(pointer){
            btnGaleria.setFrame(1);
        })

        btnGaleria.on('pointerout',function(pointer){
            btnGaleria.setFrame(0);
        })

        btnGaleria.on('pointerdown', function () {
            this.scene.start('GalleryScene');
        },this);


        //transition?
        this.cameras.main.setBounds(0, 0, 1024, 1024);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 0);

        btnJogar.on('pointerdown', function () {
            this.scene.start('QuizScene');
        }, this);



        /*
            ANIMATIONS
        */


        //words animation
            this.anims.create({
                key: "words",
                frameRate: 3,
                frames: this.anims.generateFrameNumbers("background", { start: 0, end: 2 }),
                repeat: -1
            });
            background.play("words");
    }

    update() {

    }
}
