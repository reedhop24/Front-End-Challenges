window.addEventListener('load', () => {
    let board = document.getElementById('container');
    let allRows = board.childNodes[1].children;
    board.addEventListener('click', (ev) => {
        let message = document.getElementById('message');
        let currColor = message.getElementsByTagName('span')[0];
        let currMessage = message.getElementsByTagName('h3')[0];
        let className = ev.target.className.split(' ')[0];

        let game = new Board(allRows, message, currColor, currMessage, className);
        if(!game.winner && className !== '') {
            game.addElements();
            game.changeMessage();
        }
    });
});

class Board {
    constructor(allRows, message, currColor, currMessage, className) {
        this.allRows = allRows,
        this.message = message,
        this.currColor = currColor,
        this.currMessage = currMessage,
        this.className = className,
        this.winner = false
    }

    addElements = () => {
        let previousElem;
        for(let i = 0; i < this.allRows.length; i++) {
            let row = this.allRows[i].getElementsByClassName(this.className);
            if(row[0].innerHTML.includes('span')) {
                previousElem.innerHTML = `<span class="${this.className} dot ${this.currColor.className.split(' ')[1]}"></span>`;
                break;
            }
            previousElem = row[0];
            if(i === this.allRows.length-1) {
                row[0].innerHTML = `<span class="${this.className} dot ${this.currColor.className.split(' ')[1]}"></span>`;
            }
        }
    }

    changeMessage = () => {
        const check = this.validateBoard();
        if(check !== null) {
            this.currMessage.innerHTML = check;
            this.currColor.className = '';
            this.winner = true;
        } else {
            this.currColor.className === 'dot red' ? this.currColor.className = 'dot blue' : this.currColor.className = 'dot red';
            this.currMessage.innerHTML === "Player 1's Turn" ? this.currMessage.innerHTML = "Player 2's Turn" : this.currMessage.innerHTML = "Player 1's Turn" 
        }
    }

    validateBoard = () => {
        let columns = new Map();

        for(let i = 0; i < this.allRows.length; i++) {
            const validatedColumns = this.validateColumns(columns, this.allRows[i]);
            const validatedRows = this.validateRow(this.allRows[i]);
            const validatedDiagonal = this.validateDiagonal(columns);

            if(validatedRows !== null) {
                return validatedRows;
            } else if(typeof(validatedColumns) !== 'object') {
                return validatedColumns;
            } else if(validatedDiagonal !== null) {
                return validatedDiagonal;
            }
        }
        return null;
    }

    validateColumns = (colMap, row) => {
        let td = row.children;
        let rowId = parseInt(row.id.split('-')[1]);

        for(let i = 0; i < td.length; i++) {
            if(td[i].children.length !== 0) {
                if(td[i].children[0].className === `td-${i+1} dot red`) {
                    if(!colMap.has(`td-${i+1} dot red`)) {
                        colMap.set(`td-${i+1} dot red`, [1, [rowId]]);
                    } else {
                        let redCount = colMap.get(`td-${i+1} dot red`);
                        redCount[0]++;
                        redCount[1].push(rowId);
                        if(redCount[0] >= 4 && this.validateInOrder(redCount[1])) {
                            return 'Player 1 Wins';
                        }
                        colMap.set(`td-${i+1} dot red`, redCount);
                    }
                } else if(td[i].children[0].className === `td-${i+1} dot blue`) {
                    if(!colMap.has(`td-${i+1} dot blue`)) {
                        colMap.set(`td-${i+1} dot blue`, [1, [rowId]]);
                    } else {
                        let blueCount = colMap.get(`td-${i+1} dot blue`);
                        blueCount[0]++;
                        blueCount[1].push(rowId)
                        if(blueCount[0] >= 4 && this.validateInOrder(blueCount[1])) {
                            return 'Player 2 Wins';
                        }
                        colMap.set(`td-${i+1} dot blue`, blueCount);
                    }
                }
            }
        }
        return colMap;
    }

    validateInOrder = (arr) => {
        arr = arr.sort((a,b) => a - b);
        let count = 0;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i+1]-arr[i] === 1) {
                count++;
                if(count === 3) {
                    return true;
                }
            }
        }
        return false;
    }

    validateRow = (row) => {
        let columns = row.children;
        let consecutiveRed = 0
        let consecutiveBlue = 0;
    
        for(let i = 0; i < columns.length; i++) {
            if(columns[i].children.length !== 0) {
                if(columns[i].children[0].className === `td-${i+1} dot red`) {
                    consecutiveRed++;
                    consecutiveBlue = 0;
                } else if(columns[i].children[0].className === `td-${i+1} dot blue`) {
                    consecutiveBlue++;
                    consecutiveRed = 0;
                } else {
                    consecutiveBlue = 0;
                    consecutiveRed = 0;
                }
            } else {
                consecutiveBlue = 0;
                consecutiveRed = 0;
            }
            if(consecutiveBlue === 4) {
                return 'Player 2 Wins!';
            } else if(consecutiveRed === 4) {
                return 'Player 1 Wins!';
            } 
        }
        return null;
    }

    validateDiagonal = (col) => {
        let winner = null;
        const checkDiagonal = (elem, pos, countPos = 0, countNeg = 0, direction = undefined) => {
            let newElem = elem.split(' ');
            let newTd = newElem[0].split('-');
            newTd[1] = parseInt(newTd[1]);
            newTd[1]++;
            newElem[0] = newTd.join('-');
            if(col.has(newElem.join(' '))) {
                let currPos = col.get(newElem.join(' '))[1];
                for(let i = 0; i < currPos.length; i++) {
                    for(let j = 0; j < pos.length; j++) {
                        if(Math.abs(pos[j] - currPos[i]) === 1) {
                            if(direction === 1 || direction === undefined && direction,(pos[j] - currPos[i] === 1)) {
                                direction = pos[j] - currPos[i];
                                countPos++;
                                if(countPos === 3) {
                                    winner = elem.split(' ')[2] === 'red' ? 'Player 1 Wins!' : 'Player 2 Wins!';
                                } else {
                                    checkDiagonal(newElem.join(' '), currPos, countPos, countNeg, direction, winner);
                                }
                            } else if(direction === -1 || direction === undefined && direction,(pos[j] - currPos[i] === -1)){
                                direction = pos[j] - currPos[i];
                                countNeg++;
                                if(countNeg === 3) {
                                    winner = elem.split(' ')[2] === 'red' ? 'Player 1 Wins!' : 'Player 2 Wins!';
                                } else {
                                    checkDiagonal(newElem.join(' '), currPos, countPos, countNeg, direction, winner);
                                }
                                checkDiagonal(newElem.join(' '), currPos, countPos, countNeg, direction, winner);
                            }
                        } else {
                            countPos = 0;
                            countNeg = 0;
                            direction = undefined;
                        }
                    }
                }
            }
        }
        
        if(col.size > 0) {
            for(const x of col){
                checkDiagonal(x[0], x[1][1]);
            }
        }
        return winner;
    }
}