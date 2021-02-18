class QuizScene extends Phaser.Scene {

    btn1;
    btn2;
    btn3;
    btn4;
    card;
    btns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    resultado = 0;
    info_text;
    final_text;
    correto;
    incorreto;

    constructor() {
        super('QuizScene');
    }

    init() {
        this.cameras.main.setBackgroundColor('#6cb2f3')
        this.add.text(340, 300, "A carregar...");
    }


    preload() {
        //background
        this.load.image('background_quiz', 'images/galeria/quiz/background.jpg');


        for (let i = 0; i < 14; i++) {
            this.load.image('btn' + i, 'images/galeria/quiz/btn' + i + '.png');
            this.load.image('btnSec' + i, 'images/galeria/quiz/btn_act' + i + '.png');
            if (i < 10)
                this.load.image('cardQ' + i, 'images/galeria/quiz/cards/card' + i + '.png');
        }

        this.load.spritesheet('voltar','images/buttons/setas_voltar.png',{
            frameWidth: 174,
            frameHeight: 127,
        })

        this.load.image('correto', 'images/galeria/quiz/correto.png');
        this.load.image('incorreto', 'images/galeria/quiz/incorreto.png');
    }

    create() {

        //background
        this.add.image(400, 300, 'background_quiz');
        let count = 0;


        //info-text
        this.info_text = this.make.text({
            x: 310,
            y: 40,
            text: 'Pergunta 1/10',
            style: {
                fontFamily: 'Arial',
                fontWeight: 'bold',
                font: "3em bold",
                color: '#000000'
            }
        });

        this.final_text = this.make.text({
            x: 150,
            y: 250,
            alpha: 0,
            text: 'Acertaste = ' + this.resultado + ' de 10 perguntas!',
            style: {
                fontFamily: 'Arial',
                fontWeight: 'bold',
                font: "4em bold",
                color: '#000000'
            }
        })

        //btn_voltar
        let btnVoltar = this.add.sprite(40,30,'voltar').setInteractive({useHandCursor: true});
        btnVoltar.setScale(0.5);

        btnVoltar.on('pointerover',function (){
            btnVoltar.setFrame(1);
        });


        btnVoltar.on('pointerout', function () {
            btnVoltar.setFrame(0);
        });

        btnVoltar.on('pointerdown',function (){
            this.resultado = 0;
            this.scene.start('MainScreenScene');
        },this);


        //card   280 520
        this.card = this.add.image(this.sys.canvas.width + 400, 350, 'cardQ0');


        this.animateCard(this.card, count, 400);
    }

    generateOptions(count) {

        this.info_text.setText('Pergunta ' + (count + 1) + '/10')

        this.btn1 = this.add.image(this.card.x, this.card.y, 'btn0').setInteractive({useHandCursor: true});
        this.btn2 = this.add.image(this.card.x, this.card.y, 'btn1').setInteractive({useHandCursor: true});
        this.btn3 = this.add.image(this.card.x, this.card.y, 'btn2').setInteractive({useHandCursor: true});
        this.btn4 = this.add.image(this.card.x, this.card.y, 'btn9').setInteractive({useHandCursor: true});
        let indexLocked = 0;
        let indexBtnLocked = 0;
        let btns = [this.btn1, this.btn2, this.btn3, this.btn4];
        let btns_length = this.btns.slice();

        switch (count) {
            case 0:
                indexBtnLocked = 0;
                break;
            case 1:
                indexBtnLocked = 1;
                break;
            case 2:
                indexBtnLocked = 5;
                break
            case 3:
                indexBtnLocked = 8;
                break;
            case 4:
                indexBtnLocked = 2;
                break;
            case 5:
                indexBtnLocked = 3;
                break;
            case 6:
                indexBtnLocked = 6;
                break;
            case 7:
                indexBtnLocked = 7;
                break;
            case 8:
                indexBtnLocked = 9;
                break;
            case 9:
                indexBtnLocked = 4;
                break;

        };

        indexLocked = Math.floor(Math.random() * 3);

        this.removeItemOnce(btns_length, indexBtnLocked);

        for (let i = 0; i < 4; i++) {
            if (i == indexLocked) {
                btns[i].setTexture('btn' + indexBtnLocked);

                btns[i].on('pointerover', function () {
                    btns[i].setTexture('btnSec' + indexBtnLocked);
                }, this);

                btns[i].on('pointerout', function () {
                    btns[i].setTexture('btn' + indexBtnLocked);
                }, this);

                btns[i].on('pointerdown', function () {
                    btns[i].setTexture('btn' + indexBtnLocked);
                    count++;
                    this.resultado = this.resultado + 1;
                    this.correto = this.add.image(400, 300, 'correto');
                    const tween = this.tweens.add({
                        targets: this.correto,
                        x: 400,
                        ease: Phaser.Math.Easing.Expo.InOut,
                        duration: 2000
                    });

                    tween.on('complete', function () {
                            this.animateCard(this.card, count, -400);
                            this.correto.setAlpha(0);
                    }, this)
                }, this);
            }


            if (i != indexLocked) {

                let randomElement = btns_length[Math.floor(Math.random() * btns_length.length)];

                btns[i].setTexture('btn' + randomElement);

                btns[i].on('pointerover', function () {
                    btns[i].setTexture('btnSec' + randomElement);
                }, this);

                btns[i].on('pointerout', function () {
                    btns[i].setTexture('btn' + randomElement);
                }, this);

                btns[i].on('pointerdown', function () {
                    count++;
                    this.incorreto = this.add.image(400, 300, 'incorreto');
                    const tween = this.tweens.add({
                        targets: this.incorreto,
                        x: 400,
                        ease: Phaser.Math.Easing.Expo.InOut,
                        duration: 2000
                    });

                    tween.on('complete', function () {
                        this.animateCard(this.card, count, -400);
                        this.incorreto.setAlpha(0);
                    }, this)
                }, this);

                btns_length = this.removeItemOnce(btns_length, randomElement);
            }
        }
        ;
    }

    removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }


    animateCard(card, index, x) {
        if (!index)
            this.generateOptions(index);

        if (x == 400)
            card.setTexture('cardQ' + index);

        const tween = this.tweens.add({
            targets: card,
            x: x,
            ease: Phaser.Math.Easing.Expo.InOut,
            duration: 500
        });

        tween.on('complete', function () {
            card.setTexture('cardQ' + index);

            if (x < 0) {
                if (index != 10)
                    this.parent.scene.generateOptions(index);

                card.setX(this.parent.scene.sys.canvas.width + 400);
                this.parent.scene.tweens.add({
                    targets: card,
                    x: 400,
                    ease: Phaser.Math.Easing.Expo.InOut,
                    duration: 500
                });

                if (index == 10){
                    this.parent.scene.btn1.destroy();
                    this.parent.scene.btn2.destroy();
                    this.parent.scene.btn3.destroy();
                    this.parent.scene.btn4.destroy();
                    this.parent.scene.info_text.destroy();
                    this.parent.scene.card.destroy();
                    this.parent.scene.final_text.setX(1200);
                    this.parent.scene.final_text.setAlpha(1)
                    this.parent.scene.final_text.setText("Acertaste " + this.parent.scene.resultado +' de 10 perguntas!');
                   const tween1 = this.parent.scene.tweens.add({
                        targets:  this.parent.scene.final_text,
                        x: 150,
                        ease: Phaser.Math.Easing.Expo.InOut,
                        duration: 1000
                    });
                   tween1.on('complete',function (){
                       const tween = this.parent.scene.tweens.add({
                           targets: this.parent.scene.final_text,
                           x: -600,
                           ease: Phaser.Math.Easing.Expo.InOut,
                           duration: 8000
                       });

                       tween.on('complete',function (){
                           this.parent.scene.scene.start('MainScreenScene');
                       });
                   })



                }
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
        if (this.btn1 != undefined)
            this.btn1.setPosition(this.card.x - 120, this.card.y + 50);

        if (this.btn2 != undefined)
            this.btn2.setPosition(this.card.x - 120, this.card.y + 150);

        if (this.btn3 != undefined)
            this.btn3.setPosition(this.card.x + 120, this.card.y + 50);

        if (this.btn4 != undefined)
            this.btn4.setPosition(this.card.x + 120, this.card.y + 150);

    }
}
