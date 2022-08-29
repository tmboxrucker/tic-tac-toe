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
    let test = true;
    const checkGameOver = (board,player) => {
        if (test == true){
            if (
                (board[0] == board[1] && board[0] == board[2] && board[0] != null) ||
                (board[3] == board[4] && board[3] == board[5] && board[3] != null) ||
                (board[6] == board[7] && board[6] == board[8] && board[6] != null) ||
                (board[0] == board[3] && board[0] == board[6] && board[0] != null) ||
                (board[1] == board[4] && board[1] == board[7] && board[1] != null) ||
                (board[2] == board[5] && board[2] == board[8] && board[2] != null) ||
                (board[0] == board[4] && board[0] == board[8] && board[0] != null) ||
                (board[2] == board[4] && board[2] == board[6] && board[2] != null)
                ) {
                    const _humanSign = document.getElementsByClassName('selected')[0].innerText;
                    if (_humanSign == player) {
                        return 10;
                    }
                    else {
                        return -10;
                    }
                }
                else if (board.length == 9 && board.includes(undefined)) {
                    return;
                }
                else if (board.length == 9) {
                    return 0;
                }
                else {
                    return;
                }
        }
        else {
            if (
                (board[0] == board[1] && board[0] == board[2] && board[0] != null) ||
                (board[3] == board[4] && board[3] == board[5] && board[3] != null) ||
                (board[6] == board[7] && board[6] == board[8] && board[6] != null) ||
                (board[0] == board[3] && board[0] == board[6] && board[0] != null) ||
                (board[1] == board[4] && board[1] == board[7] && board[1] != null) ||
                (board[2] == board[5] && board[2] == board[8] && board[2] != null) ||
                (board[0] == board[4] && board[0] == board[8] && board[0] != null) ||
                (board[2] == board[4] && board[2] == board[6] && board[2] != null)
                ) {
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
                else if (board.length == 9 && board.includes(undefined)) {
                    return;
                }
                else if (board.length == 9) {
                    console.log(`It's a draw`);
                    x = false;
                    const computerOverlay = document.getElementById('overlay');
                    computerOverlay.classList.add('active');
                    const winnerDeclaration = document.getElementById('winnerDeclaration');
                    winnerDeclaration.innerHTML = `It's a draw!!!`
                    const modalRestart = document.getElementById('modalRestart').classList.add('active');
                }
                else {
                    return;
                }
        }
    }
    const computerTurn = (player) => {
        const computerDifficulty = document.getElementById('difficult').value;
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
            let computerBoard = getEmptyFields();
            if (computerDifficulty == 'hard') {
                let choice = (computerTurnHard(computer,gameBoardModule)).index;
                computerOverlay.classList.remove('active');
                console.log(choice);
                choice = parseInt(choice);
                const boardCollect = document.querySelector(`.contentContainer .square:nth-child(${(choice + 1)})`);
                boardCollect.classList.add(computer, 'squareDeselected');
                boardCollect.classList.remove('square');
                boardCollect.innerText = computer;
                setBoard(choice,computer);
                if (x == false) {
                    return 'Computer won';
                }
                return;
            }
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
    const getEmptyFields = () => {
        fields = [];
        for (let i = 0; i < _board.length; i++) {
            const field = _board[i];
            if (field == undefined) {
                fields.push(i)
            }
        }
        return fields;
    }
    const computerTurnHard = (player,computerBoard) => {
        let empty = getEmptyFields();
        if (checkGameOver(_board, player) == 0) { // draw
            // console.log('score:0')
            let test = 0;
            return {score:0}
        }
        else if (checkGameOver(_board, player) == 10) { // computer win
            // console.log('score:10')
            return {score:10}
        }
        else if (checkGameOver(_board, player) == -10) { // player win
            // console.log('score:-10')
            return {score:-10}
        }

        let moves = [];
        for (let i = 0; i < empty.length; i++) {
            let move = {};
            move.index = empty[i];
            setBoardComputer(empty[i], player);
            if (player == 'O') {
                let result = computerTurnHard('X', computerBoard);
                move.score = result.score;
            }
            else {
                let result = computerTurnHard('O', computerBoard);
                move.score = result.score;
            }
            setBoardComputer(empty[i],undefined);
            moves.push(move);
        }
        return findOptimalMove(moves, player)
    }
    const findOptimalMove = (moves,player) => {
        let bestMove;
        if (player != displayControllerModule.getHumanSign()) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // console.log(bestMove);
        return moves[bestMove];
    }
    const playerTurn = (num,playerChoice) => {
        const boardCollect = document.querySelector(`.contentContainer .square:nth-child(${(num + 1)})`);
        if (boardCollect == null) {
            return;
        }
        boardCollect.classList.add(playerChoice, 'squareDeselected');
        boardCollect.classList.remove('square');
        boardCollect.innerText = playerChoice;
        test = false;
        setBoard(num,playerChoice);
        if (x == false) {
            return `Player won`;
        }
        computerTurn(playerChoice);
    }
    const setBoard = (num,choice) => {
        test = false;
        _board[num] = choice;
        checkGameOver(_board,choice);
        test = true;
    }
    const setBoardComputer = (num,choice) => {
        if (choice == undefined) {
            _board[num] = undefined;
            return;
        }
        _board[num] = choice;
    }
    const setName = (playerName) => {
        name = playerName;
    }
    return {playerTurn,computerTurn,setName}
})();

const displayControllerModule = (() => {
    const makeMove = document.querySelectorAll('.square');
    let _humanSign;
    
    makeMove.forEach(makeMoves => {
        makeMoves.addEventListener('click', renderArrayToString);
        function renderArrayToString() {
            _humanSign = document.getElementsByClassName('selected')[0].innerText;
            let passInt = parseInt(this.id);
            gameBoardModule.playerTurn(passInt,_humanSign);
        }
    })
    const getHumanSign = () => _humanSign;
    return {getHumanSign};
})();