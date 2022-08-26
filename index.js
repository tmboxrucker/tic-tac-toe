const Player = (e) => {
    let _sign = e.innerText;
    const selectPlayer = () => {
        if (_sign == 'X') {
            const select = document.getElementById(e.id);
            const deselect = document.getElementById(e.id).nextElementSibling;
            select.classList.add('selected');
            deselect.classList.remove('selected');
        }
        else if (_sign == 'O') {
            const select = document.getElementById(e.id);
            const deselect = document.getElementById(e.id).previousElementSibling;
            select.classList.add('selected');
            deselect.classList.remove('selected');
        }
        else {
            alert('Invalid Entry')
        }
    }
    const submitPlayerChoice = () => {
        const name = document.getElementById('modalName');
        
        if (name.value == undefined || name.value == '') {
            name.value = 'Player 1';
        }
        createPlayer().closeModal()
        createPlayer(name.value, _sign).setPlayerName()
        if (_sign == "O") {
            gameBoardModule.computerTurn(_sign);
        }
        gameBoardModule.setName(name.value);
    }
    return {selectPlayer, submitPlayerChoice}
}

const createPlayer = (playerName, sign) => {
    let savedPlayerName = 'Player 1';
    let savedSign = 'X';
    const setNameAndSign = () => {
        obj.savedPlayerName = playerName;
        obj.savedSign = sign;
    }
    const closeModal = () => {
        const modal = document.getElementById('modal').classList.remove('active');
        const overlay = document.getElementById('overlay').classList.remove('active');
    };
    const computerTurn = () => {
        const computerOverlay = document.getElementById('computerOverlay').classList.add('active');
        setTimeout(() => {
            
        }, 500);
    }
    let setPlayerName = (e) => {
        if (sign == 'X') {
            console.log(`this is the name of player 1 ......... ${playerName}`);
            setNameAndSign();
        }
        else {
            console.log(`this is the name of player 2 ......... ${playerName}`);
            setNameAndSign();
        }
    }
    const obj = {closeModal, setPlayerName, savedSign, savedPlayerName, computerTurn};
    return obj;
}

const gameBoardModule = (() => {
    let _board = new Array(9);
    let x;
    let name;
    const checkGameOver = (board,player) => {
        
        if ((board[0] == board[1] && board[0] == board[2] && board[0] != null) || (board[3] == board[4] && board[3] == board[5] && board[3] != null) || (board[6] == board[7] && board[6] == board[8] && board[6] != null) || (board[0] == board[3] && board[0] == board[6] && board[0] != null) || (board[1] == board[4] && board[1] == board[7] && board[1] != null) || (board[2] == board[5] && board[2] == board[8] && board[2] != null) || (board[0] == board[4] && board[0] == board[8] && board[0] != null) || (board[2] == board[4] && board[2] == board[6] && board[2] != null)) {
            const _humanSign = document.getElementsByClassName('selected')[0].innerText;
            if (_humanSign == player) {
                console.log('Player Wins')
                x = false;
                const computerOverlay = document.getElementById('overlay');
                computerOverlay.classList.add('active');
                const winnerDeclaration = document.getElementById('winnerDeclaration');
                winnerDeclaration.innerHTML = `${name} wins!!!`
                const modalRestart = document.getElementById('modalRestart').classList.add('active');
            }
            else {
                console.log('Computer Wins')
                x = false;
                const computerOverlay = document.getElementById('overlay');
                computerOverlay.classList.add('active');
                const winnerDeclaration = document.getElementById('winnerDeclaration');
                winnerDeclaration.innerHTML = `The computer wins!!!`
                const modalRestart = document.getElementById('modalRestart').classList.add('active');
            }
        }
        else if (Object.values(board).length == board.length) {
            console.log(`It's a draw`);
            x = false;
            const computerOverlay = document.getElementById('overlay');
            computerOverlay.classList.add('active');
            const winnerDeclaration = document.getElementById('winnerDeclaration');
            winnerDeclaration.innerHTML = `It's a draw!!!`
            const modalRestart = document.getElementById('modalRestart').classList.add('active');
        }
    }
    const computerTurn = (player) => {
        const computerOverlay = document.getElementById('computerOverlay');
        computerOverlay.classList.add('active');
        setTimeout(() => {            
            let computer;
            if (player == 'X') {
                computer = 'O';
            }
            else {
                computer = 'X';
            }
            let computerBoard = ['0','1','2','3','4','5','6','7','8'];
            computerBoard = computerBoard.filter(function(el) {
                return Object.keys(_board).indexOf(el) <0;
            });
            const randomChoice = parseInt(computerBoard[Math.floor(Math.random()*computerBoard.length)]);
            const boardCollect = document.querySelector(`.contentContainer .square:nth-child(${(randomChoice + 1)})`);
            boardCollect.classList.add(computer, 'squareDeselected');
            boardCollect.classList.remove('square');
            boardCollect.innerText = computer;
            setBoard(randomChoice,computer);
            if (x == false) {
                return `Computer won`;
            }
            computerOverlay.classList.remove('active');
        }, 500);

    }
    const playerTurn = (num,playerChoice) => {
        const boardCollect = document.querySelector(`.contentContainer .square:nth-child(${(num + 1)})`);
        if (boardCollect == null) {
            return;
        }
        boardCollect.classList.add(playerChoice, 'squareDeselected');
        boardCollect.classList.remove('square');
        boardCollect.innerText = playerChoice;
        setBoard(num,playerChoice);
        if (x == false) {
            return `Player won`;
        }
        computerTurn(playerChoice);
    }
    const setBoard = (num,choice) => {
        _board[num] = choice;
        checkGameOver(_board,choice);
    }
    const setName = (playerName) => {
        name = playerName;
    }
    return {playerTurn,computerTurn,setName}
})();

const displayControllerModule = (() => {
    const makeMove = document.querySelectorAll('.square');
    
    makeMove.forEach(makeMoves => {
        makeMoves.addEventListener('click', renderArrayToString);
        function renderArrayToString() {
            const _humanSign = document.getElementsByClassName('selected')[0].innerText;
            console.log(_humanSign);
            let passInt = parseInt(this.id);
            gameBoardModule.playerTurn(passInt,_humanSign);
        }
    })
})();