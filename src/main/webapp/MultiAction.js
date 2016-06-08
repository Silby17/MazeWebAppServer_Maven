var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var mazeWidth = 830;
var mazeHeight = 500;
var imageObj = document.getElementById("myImg");
var imageOpp = document.getElementById("oppImg");
imageObj.style.position= 'relative';
imageOpp.style.position= 'relative';
var borderX = 200;
var borderY = 100;
var endX, endY, endX2, endY2;


//gets a string and makes a grid out of it.
function DrawMaze(stringMaze, startX, startY, endX, endY, startX2, startY2, endX2, endY2) {
    window.addEventListener("keydown", move);
    context.rect(borderX, borderY, 400, 400);
    context.stroke();
    context.rect(borderX + 600, borderY, 400, 400);
    context.stroke();
    var x = borderX, y = borderY, index =0;
    //row
    for (var i = 0; i < 10; i++) {
        //go over the col, if 0 draw white cube if 1 draw black cube
        for (var j = 0; j < 10; j++) {
            if(stringMaze[index] == 1) {
                context.fillStyle = "#B6E9FA";
                context.fillRect(x, y, 40, 40);
                context.fillRect(x + 600, y, 40, 40);
            }
            else {
                context.fillStyle = "white";
                context.fillRect(x, y, 40, 40);
                context.fillRect(x + 600, y, 40, 40);
            }
            x = x + 40;
            index++;
        }
        y = y + 40;
        x = borderX;
    }

    //place start image 4 the main player
    var x = (240 + (startX * 40));
    var y = (100 + (startY * 40));
    imageObj.style.left = parseInt(x)  + 'px';
    imageObj.style.top = parseInt(y) + 'px';
    imageObj.style.visibility = 'visible';
    //color end point
    context.fillStyle = "#3045BF";
    endX = (200 + (40 * endX));
    endY = (100 + (40 * endY));
    context.fillRect(endX, endY, 40, 40);

    //place start image 4 the opp player
    var x = (880 + (startX2 * 40));
    var y = (100 + (startY2 * 40));
    imageOpp.style.left = parseInt(x)  + 'px';
    imageOpp.style.top = parseInt(y) + 'px';
    imageOpp.style.visibility = 'visible';
    //color end point
    context.fillStyle = "#3045BF";
    endX2 = (800 + (40 * endX2));
    endy2 = (100 + (40 * endY2));
    context.fillRect(endX2, endy2, 40, 40);
}

/*
Checks wheather the player is able to move in the direction he desires
 */
function canMoveTo(destX, destY) {
    var canMove ; // 1 means: player can move
    // check whether the player would move inside the bounds of the canvas
    if (destX >= 200 && destX <= mazeWidth - 40 && destY >= 100 && destY <= mazeHeight - 40) {
        canMove = 1;
    }
    else {
        canMove = 0;
    }
    return canMove;
}


//show win alert
function win() {
    alert("Congratulations!");
    window.removeEventListener("keydown", move);
}


function move(e) {
    var movingAllowed;
    var color, blue;
    e = e || window.event;
    switch (e.keyCode) {
        // arrow up key
        case 38:
            movingAllowed = canMoveTo(parseInt(imageObj.style.left), parseInt(imageObj.style.top) - 40);
            color = context.getImageData((parseInt(imageObj.style.left) - 40), (parseInt(imageObj.style.top) - 40), 40, 40);
            blue = parseInt(color.data[2]);
            //if blue pixels are 255 mines it is white
            if(movingAllowed == 1 && blue == 255) {
                document.getElementById("myImg").style.visibility = "hidden";
                imageObj.style.top = parseInt(imageObj.style.top) - 40 + 'px';
                imageObj.style.visibility = 'visible';
                sendMove("up");
            }
            //check win
            if(movingAllowed == 1 && blue == 191) {
                win();
            }
            break;
        // arrow left key
        case 37:
            movingAllowed = canMoveTo(parseInt(imageObj.style.left) - 40, parseInt(imageObj.style.top));
            color = context.getImageData(parseInt(imageObj.style.left) - 80, parseInt(imageObj.style.top), 40, 40);
            blue = parseInt(color.data[2]);
            if(movingAllowed == 1 && blue == 255) {
                document.getElementById("myImg").style.visibility = "hidden";
                imageObj.style.left = parseInt(imageObj.style.left) - 40 + 'px';
                imageObj.style.visibility = 'visible';
                sendMove("left");
            }
            //check win
            if(movingAllowed == 1 && blue == 191) {
                win();
            }
            break;
        // arrow down key
        case 40:
            movingAllowed = canMoveTo(parseInt(imageObj.style.left), parseInt(imageObj.style.top + 40));
            color = context.getImageData((parseInt(imageObj.style.left)- 40), (parseInt(imageObj.style.top) +40)  , 40, 40);
            blue = parseInt(color.data[2]);
            if(movingAllowed == 1 && blue == 255) {
                document.getElementById("myImg").style.visibility = "hidden";
                imageObj.style.top = parseInt(imageObj.style.top) + 40 + 'px';
                imageObj.style.visibility = 'visible';
                sendMove("down");
            }
            //check win
            if(movingAllowed == 1 && blue == 191) {
                win();
            }
            break;
        // arrow right key
        case 39:
            movingAllowed = canMoveTo(parseInt(imageObj.style.left) + 40, parseInt(imageObj.style.top));
            color = context.getImageData(parseInt(imageObj.style.left), parseInt(imageObj.style.top), 40, 40);
            blue = parseInt(color.data[2]);
            if(movingAllowed == 1 && blue == 255) {
                document.getElementById("myImg").style.visibility = "hidden";
                imageObj.style.left = parseInt(imageObj.style.left) + 40 + 'px';
                imageObj.style.visibility = 'visible';
                sendMove("right");
            }
            //check win
            if(movingAllowed == 1 && blue == 191) {
                win();
            }
            break;
    }
}


//The function builds a 2d array and placing the string in it.
function SetSolveArray(stringMaze) {
    var index = 0, i, j;
    for (i = 0; i < 10; i++)
        arrSolved[i] = new Array(10);
//placing the solve string in a 2d array
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            arrSolved[i][j] = stringMaze[index];
            index++;
        }
    }
}

/*
This method Will MOve the Opponents Icon
 */
function oppMoves(stringMove) {
    var str = stringMove.substring(0, stringMove.length -2);
    switch(str) {
        case "up":
            imageOpp.style.visibility = "hidden";
            imageOpp.style.top = parseInt(imageOpp.style.top) - 40 + 'px';
            imageOpp.style.visibility = 'visible';
            break;

        case "left":
            imageOpp.style.visibility = "hidden";
            imageOpp.style.left = parseInt(imageOpp.style.left) - 40 + 'px';
            imageOpp.style.visibility = 'visible';
            break;

        case"right":
            imageOpp.style.visibility = "hidden";
            imageOpp.style.left = parseInt(imageOpp.style.left) + 40 + 'px';
            imageOpp.style.visibility = 'visible';
            break;

        case"down":
            imageOpp.style.visibility = "hidden";
            imageOpp.style.top = parseInt(imageOpp.style.top) + 40 + 'px';
            imageOpp.style.visibility = 'visible';
            break;
    }
}


//The function shows the best suggestion on screen according to current position.
function Solve() {
    alert("googd");
    var movingAllowed, distance, minDistance = 1000;
    currI = parseInt(imageObj.style.left);
    currJ = parseInt(imageObj.style.top);
    var i = (((currI - 430)/40) - 1) ;
    var j = (((currJ - 100)/40) - 1) ;
    //not enough also check that the 2 is the closet to win point
    //left
    movingAllowed = canMoveTo(currI - 40,  currJ);
    var color = context.getImageData(currI - 80, currJ, 40, 40);
    var blue = parseInt(color.data[2]);
    if(2 == arrSolved[i][j] && 1 == movingAllowed && blue == 255)
    {
        distance = Math.sqrt((currI - 40 - x2) * (x1 - x2) + (y1 - y2)*(y1 - y2));
        if(distance < minDistance)
        {
            minDistance = distance;
        }
        context.fillStyle = "#FC2828";
        context.fillRect(currI - 40,  currJ, 40, 40);
    }
}

/*
This will send the ajax object with the players move to the server
 */
function sendMove(moveToSend){
    var send = {"move" : moveToSend};
    $.ajax({
        type: 'GET',
        url: 'SendMoveServlet',
        data: send
    });
}

document.getElementById("myImg").style.visibility = "hidden";
window.addEventListener("keydown", move);