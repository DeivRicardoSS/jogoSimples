const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        timerId: setInterval(randonSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
        enemyVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    }
}

function playSound(nomeDaMusica){
    let audio = new Audio(`./assets/audio/${nomeDaMusica}`);
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        alert("Game Over! \nO Seu Resultado foi "+ state.values.result);
    }
}

function randonSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randonNumber = Math.floor(Math.random() * 9);
    let randonSquare = state.view.squares[randonNumber];
    randonSquare.classList.add("enemy");
    state.values.hitPosition = randonSquare.id;
}



function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener('mousedown', ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('dano.mp3');
            }
        });
    });
}

function init(){
    addListenerHitBox();
}

init();