class personagem {
    _life = 1;
    maxlife = 1;
    attack = 0;
    defense = 0;



    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }


}

class power extends personagem {
    constructor(name) {
        super(name);
        this.life = 150;
        this.attack = 10;
        this.defense = 8;
        this.maxlife = this.life;

    }
}

class medium extends personagem {
    constructor(name) {
        super(name);
        this.life = 150;
        this.attack = 17;
        this.defense = 5;
        this.maxlife = this.life;
    }
}

class Bigmonster extends personagem {
    constructor() {
        super('Big Monster');
        this.life = 200;
        this.attack = 23;
        this.defense = 3;
        this.maxlife = this.life;
    }
}

class Stage {
    constructor(lutador1, lutador2, lutador1El, lutador2El, logObj) {
        this.lutador1 = lutador1;
        this.lutador2 = lutador2;
        this.lutador1El = lutador1El;
        this.lutador2El = lutador2El
        this.log = logObj;

    }

    start() {
        this.update();

        this.lutador1El.querySelector('.attackbt').addEventListener('click', () => this.Doattack(this.lutador1, this.lutador2));

        this.lutador2El.querySelector('.attackbt').addEventListener('click', () => this.Doattack(this.lutador2, this.lutador1));
    }

    update() {
        //lutador1
        this.lutador1El.querySelector('.name').innerHTML = `${this.lutador1.name} - ${this.lutador1.life.toFixed(1)}HP`;


        let f1pct = (this.lutador1.life / this.lutador1.maxlife) * 100;
        this.lutador1El.querySelector('.bar').style.width = `${f1pct}%`;

        // lutador2
        this.lutador2El.querySelector('.name').innerHTML = `${this.lutador2.name} - ${this.lutador2.life.toFixed(1)}HP`;

        let f2pct = (this.lutador2.life / this.lutador2.maxlife) * 100;
        this.lutador2El.querySelector('.bar').style.width = `${f2pct}%`;

        
    }

    Doattack(attacking, attacked) {

        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`OPS !! ${attacked.name} já está morto`);
            return;
        }
        let attackFactor = (Math.random() * 2).toFixed(2);

        let defenseFactor = (Math.random() * 2).toFixed(2);

        let attackatual = attacking.attack * attackFactor;


        let defenseatual = attacked.defense * attackFactor;

        if (attackatual > defenseatual) {
            attacked.life -= attackatual;
            this.log.addMessage(`${attacking.name} causou ${attackatual.toFixed(2)}`)

        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender ...`);
        }

        this.update();
    }
}


class Log {
    list = [];

    constructor (listEl){
        this.listEl =  listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for(let i in this.list){
            this.listEl.innerHTML += `<li> ${this.list[i]}</li>`;
        }
    }
    
}
