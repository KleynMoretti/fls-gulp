"use strict";
let cells = document.querySelectorAll('.cell'),
    rows = document.querySelectorAll('.tr'),
    counter = 1,
    selected,
    collectionOfCheckers = {};

for (let i = 0; i < cells.length; i++) {
    if (i % 8 == 0) counter++;
    if (counter % 2 == 1) cells[i].style.backgroundColor = 'rgb(196, 174, 133)';
    counter++;
}


function Kill(cell) {
    cell.alive = false;
    cell.color = 'grey';
    changeColor(document.getElementById(cell.row+cell.cell), cell.color);
};


function Checker(color, row, cell, alive) {
    this.primalColor = color;
    this.color = color;
    this.row = row;
    this.cell = cell;
    this.canBeat = false;
    this.alive = alive;
    this.select = false;

    this.move = function(row, selectedCell) {
        if (!selectedCell.alive) {
            changeColor(document.getElementById(this.row + this.cell), 'grey');
            collectionOfCheckers[row+selectedCell] = collectionOfCheckers[this.row+this.cell];
            delete collectionOfCheckers[this.row+this.cell];
            this.cell = selectedCell;
            this.row = row;
            changeColor(document.getElementById(row + selectedCell), this.color);
        }
    };

    this.beat = function(row, selectedCell, enemyCell) {
        if (this.canBeat) {
            Kill(enemyCell);
            this.move(row, selectedCell);
        }
    };

}
let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let countI = 0;

for (let i of rows) {
    let countT = 0;
    for (let t of i.children) {
        t.id =  '' + countI + arr_en[countT];

        if ((countT+countI) % 2 == 1) {
            countT++;
            continue;
        };

        
        let color = 'grey',
            alive = false;


        if (countI < 3) 
        {
            color = 'white';
            alive = true;
        };
        if (countI > 4) 
        {
            color = 'black';
            alive = true;
        };


        let object = new Checker(color, countI, arr_en[countT], alive);
        collectionOfCheckers[t.id] = object;
        changeColor(t, object.color);
        countT++;
    }
    countI++;
}
    
table.addEventListener('click', function() {
    selected = collectionOfCheckers[event.target.id];
    selected.select = !selected.select;
    if (selected.select) changeColor(document.getElementById(selected.row+selected.cell), 'green');
    if (!selected.select) changeColor(document.getElementById(selected.row+selected.cell), selected.primalColor);
});

function changeColor(t, color) {
    t.className= 'cell' + ' ' + color;
}

collectionOfCheckers['2a'].move(3, 'b');
collectionOfCheckers['3b'].move(2, 'a');