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
    }
    return {selectPlayer, submitPlayerChoice}
}

const createPlayer = (playerName, sign) => {
    let savedPlayerName = 'Player 1';
    let savedSign = 'X';
    // const getName = () => savedPlayerName;
    // const getSign = () => savedSign;
    const setNameAndSign = () => {
        obj.savedPlayerName = playerName;
        obj.savedSign = sign;
        console.log(savedPlayerName);
        console.log(playerName);
        console.log(obj.savedPlayerName);
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
            // getName('X');
            setNameAndSign();
        }
        else {
            console.log(`this is the name of player 2 ......... ${playerName}`);
            // getName('O');
            setNameAndSign();
        }
    }
    const obj = {closeModal, setPlayerName, savedSign, savedPlayerName, computerTurn};
    return obj;
}

const gameBoardModule = (() => {
    let _board = new Array(9);
    let x;
    const checkGameOver = (board,player) => {
        let computerBoard = ['0','1','2','3','4','5','6','7','8'];
        computerBoard = computerBoard.filter(function(el) {
            return Object.keys(board).indexOf(el) <0;
        });
        console.log(computerBoard);

        console.log(Object.keys(board));
        if ((board[0] == board[1] && board[0] == board[2] && board[0] != null) || (board[3] == board[4] && board[3] == board[5] && board[3] != null) || (board[6] == board[7] && board[6] == board[8] && board[6] != null) || (board[0] == board[3] && board[0] == board[6] && board[0] != null) || (board[1] == board[4] && board[1] == board[7] && board[1] != null) || (board[2] == board[5] && board[2] == board[8] && board[2] != null) || (board[0] == board[4] && board[0] == board[8] && board[0] != null) || (board[2] == board[4] && board[2] == board[6] && board[2] != null)) {
            const _humanSign = document.getElementsByClassName('selected')[0].innerText;
            if (_humanSign == player) {
                console.log('Player Wins')
                x = false;
            }
            else {
                console.log('Computer Wins')
                x = false;
            }
        }
    }
    const setBoard = (num,player) => {
        const boardCollect = document.querySelector(`.contentContainer .square:nth-child(${(num + 1)})`);
        // console.log(boardCollect);
        boardCollect.classList.add(player);
        _board[num] = player;
        console.log(player);
        checkGameOver(_board,player);
        console.log(x);
        if (x == false) {
            return;
        }
        // createPlayer().computerTurn();
    }
    return {setBoard}
})();

const displayControllerModule = (() => {
    const makeMove = document.querySelectorAll('.square');
    // const checkForGameOver = () => {
    //     console.log(gameBoardModule.getBoard())
    // }
    
    makeMove.forEach(makeMoves => {
        makeMoves.addEventListener('click', renderArrayToString);
        function renderArrayToString() {
            const _humanSign = document.getElementsByClassName('selected')[0].innerText;
            // console.log(_humanSign);
            this.innerText = _humanSign;
            // console.log(this.id);
            let passInt = parseInt(this.id);
            gameBoardModule.setBoard(passInt,_humanSign);
            // checkForGameOver();
        }
    })
})();



// Set player X or O from button prompts


// const selectPlayer = (e) => {
//     if (e.innerText == 'X') {
//         const select = document.getElementById(e.id);
//         const deselect = document.getElementById(e.id).nextElementSibling;
//         select.classList.add('selected');
//         deselect.classList.remove('selected');
//     }
//     else if (e.innerText == 'O') {
//         const select = document.getElementById(e.id);
//         const deselect = document.getElementById(e.id).previousElementSibling;
//         select.classList.add('selected');
//         deselect.classList.remove('selected');
//     }
//     else {
//         alert('Invalid Entry')
//     }
// }
// const submitPlayerChoice = () => {
//     const name = document.getElementById('modalName');
    
//     if (name.value == undefined || name.value == '') {
//         name.value = 'Player 1';
//     }
//     createPlayer(name.value, ).closeModal()
// }


// let Troy = createPlayer('Troy',"X");
// let Jess = createPlayer('Jess',"O");