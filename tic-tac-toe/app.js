window.addEventListener('load', () => {
    let table = document.getElementById('game-table');
    let moves = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
    let gameButton = document.getElementById('game-button');
    let winner = false;

    table.addEventListener('click', (ev) => {
        let move = document.getElementById(ev.target.id);
        let header = document.getElementById('game-header');

        if(moves.length > 0 && move.innerHTML === '' && !winner) {
            move.innerHTML = moves.pop();
            header.innerHTML = moves.length % 2 === 0 ? "Player 2's Turn" : "Player 1's Turn";
        }

        let evaluatedBoard = evaluateBoard();
        if(evaluatedBoard === 'player1') {
            header.innerHTML = 'Player 1 Won!';
            winner = true;
        } else if(evaluatedBoard === 'player2') {
            header.innerHTML = 'Player 2 Won!';
            winner = true;
        }
        if(!evaluatedBoard && moves.length === 0) {
            header.innerHTML = 'Cats Game!';
            winner = true;
        }
    });

    gameButton.addEventListener('click', () => {
        let td = document.getElementsByTagName('td');
        for(let i = 0; i < td.length; i++) {
            td[i].innerHTML = '';
        }
        let header = document.getElementById('game-header');
        header.innerHTML = "Player 1's turn";
        winner = false;
        moves = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
    });

    const evaluateBoard = () => {
        let td = document.getElementsByTagName('td');
        let rows = [[],[],[]];

        for(let i = 0; i < td.length; i++) {
            if(i <= 2) {
                rows[0].push(td[i].innerHTML);
            } else if(i <= 5) {
                rows[1].push(td[i].innerHTML);
            } else {
                rows[2].push(td[i].innerHTML);
            }
        }

        const validateRows = (matrix) => {
            for(let i = 0; i < 3; i++) {
                if(matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== '') {
                    return matrix[i][0] === 'O' ? 'player1' : 'player2'; 
                } else if(matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i] && matrix[0][i] !== '') {
                    return matrix[0][i] === 'O' ? 'player1' : 'player2'; 
                } 
            }
            return null;
        }

        const validateDiagonal = (matrix) => {
            if(matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== '') {
                return matrix[0][0] === 'O' ? 'player1' : 'player2'; 
            } else if(matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== '') {
                return matrix[0][2] === 'O' ?'player1' : 'player2'; 
            } else {
                return null;
            }
        }

        if(validateRows(rows)) {
            return validateRows(rows);
        } else if(validateDiagonal(rows)) {
            return validateDiagonal(rows);
        } else {
            return null;
        }
    }
});