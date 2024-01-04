

let log = new Log(document.querySelector('.log'));
let char = new power('Luffy');

let monster = new medium('Crocodile');

console.log(monster.name);

const stage = new Stage(
    char, monster, 
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();