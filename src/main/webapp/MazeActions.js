var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var mazeWidth = 870;
var mazeHeight = 500;
var arrSolved = new Array(10);
var imageObj = document.getElementById("myImg");
imageObj.style.position= 'relative';
imageObj.style.left = '470px';
imageObj.style.top = '100px';
var currI, currJ, endx, endy, xRed = -1, yRed = -1;

//Gets a string and makes a grid out of it.
function DrawMaze(stringMaze, startX, startY, endX, endY) {
 window.addEventListener("keydown", move);
 context.rect(430,100,400,400);
 context.stroke();
 var x = 430, y = 100, index =0;
//row
 for (var i = 0; i < 10; i++) {
  //go over the col, if 0 draw white cube if 1 draw black cube
  for (var j = 0; j < 10; j++) {
   if(stringMaze[index] == '1') {
    context.fillStyle = "#B6E9FA";
    context.fillRect(x, y, 40, 40);
   }
   else {
    context.fillStyle = "white";
    context.fillRect(x, y, 40, 40);
   }
   x = x + 40;
   index++;
  }
  y = y + 40;
  x = 430;
 }
 //place start image
 var x1 = (470 + (startX * 40));
 var y1 = (100 + (startY * 40));
 imageObj.style.left = parseInt(x1)  + 'px';
 imageObj.style.top = parseInt(y1) + 'px';
 imageObj.style.visibility = 'visible';
 //color end point
 context.fillStyle = "#3045BF";
 endx = (430 + (40 * endY));
 endy = (100 + (40 * endX));
 context.fillRect(endx, endy, 40, 40);
}

//Checks it the given point is in the border of the grid.
function canMoveTo(destX, destY) {
 var canMove ; // 1 means: player can move
 // check whether the player would move inside the bounds of the canvas
 if (destX >= 430 && destX <= mazeWidth - 40 && destY >= 100 && destY <= mazeHeight - 40) {
  canMove = 1;
 }
 else {
  canMove = 0;
 }
 return canMove;
}

//Show win message
function win() {
 alert("Congratulations!");
 window.removeEventListener("keydown", move);
}

//The function is in charge of the movement of the icon on the board.
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
   if(movingAllowed == 1 && (blue == 255 || blue == 40)) {
    imageObj.style.visibility = "hidden";
    imageObj.style.top = parseInt(imageObj.style.top) - 40 + 'px';
    imageObj.style.visibility = 'visible';
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
   if(movingAllowed == 1 && (blue == 255 || blue == 40)) {
    imageObj.style.visibility = "hidden";
    imageObj.style.left = parseInt(imageObj.style.left) - 40 + 'px';
    imageObj.style.visibility = 'visible';
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
   if(movingAllowed == 1 && (blue == 255 || blue ==40)) {
    imageObj.style.visibility = "hidden";
    imageObj.style.top = parseInt(imageObj.style.top) + 40 + 'px';
    imageObj.style.visibility = 'visible';
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
   if(movingAllowed == 1 && (blue == 255 || blue == 40)) {
    imageObj.style.visibility = "hidden";
    imageObj.style.left = parseInt(imageObj.style.left) + 40 + 'px';
    imageObj.style.visibility = 'visible';
   }
   //check win
   if(movingAllowed == 1 && blue == 191) {
    win();
   }
   break;
 }
 if( -1 != xRed && -1 != yRed) {
  //color the suggestion white
  context.fillStyle = "#FFFFFF";
  context.fillRect(xRed, yRed, 40, 40);
 }
}

//The function builds a 2d array and placing the string in it.
function SetSolveArray(stringMaze) {
 console.log(stringMaze);
 var index = 0, i, j;
 for (i = 0; i < 10; i++)
  arrSolved[i] = new Array(10);
//placing the solve string in a 2d array
 for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
   arrSolved[i][j] = String(stringMaze[index]);
   index++;
  }
 }
 Solve();
}

//The function shows the best suggestion on screen according to current position.
function Solve() {
 var movingAllowed, color, blue, min = 1000, distance, counter = 0, run = 1;
 //data about current place of image
 currI = parseInt(imageObj.style.left);
 currJ = parseInt(imageObj.style.top);
 var i,j, endI =(((endx - 430) / 40)), endJ = (((endy - 60) / 40) - 1);
 //cordinats of drawing a rec (left up point)
 var XL = currI - 80, YL = currJ;
 var XU = currI - 40, YU = currJ - 40;
 var XD = currI - 40, YD = currJ + 40;
 var XR = currI, YR = currJ;
 alert("Follow the red cube, it will lead you to the end spot.");
 while (1 == run) {
  //left
  i = (((XL - 430) / 40));
  j = (((YL - 60) / 40) - 1);
  movingAllowed = canMoveTo(XL , YL);
  color = context.getImageData(XL , YL, 40, 40);
  blue = parseInt(color.data[2]);
  //add min dis and color at the end
  if (i >= 0 && j >= 0 && '2' == arrSolved[i][j] && 1 == movingAllowed && 255 == blue) {
   distance = Math.sqrt((i  - endI) * (i  - endI) + (j - endJ) * (j - endJ));
   if (distance < min) {
    min = distance;
    xRed = XL;
    yRed = YL;
    counter++;
   }
  }
  //up
  i = (((XU  - 430) / 40));
  j = (((YU - 60) / 40) - 1);
  movingAllowed = canMoveTo(XU, YU - 40);
  color = context.getImageData(XU , YU, 40, 40);
  blue = parseInt(color.data[2]);
  //add min dis and color at the end
  if (i >= 0 && j >= 0 && '2' == arrSolved[i][j] && 1 == movingAllowed && 255 == blue) {
   distance = Math.sqrt((i  - endI) * (i - endI) + (j - endJ) * (j - endJ));
   if (distance < min) {
    min = distance;
    xRed = XU;
    yRed = YU;
    counter++;
   }
  }
  //down
  i = (((XD  - 430) / 40));
  j = (((YD - 60) / 40) - 1);
  movingAllowed = canMoveTo(XD, YD);
  color = context.getImageData(XD , YD, 40, 40);
  blue = parseInt(color.data[2]);
  //add min dis and color at the end
  if (i >= 0 && j >= 0 && '2' == arrSolved[i][j] && 1 == movingAllowed && 255 == blue) {
   distance = Math.sqrt((i  - endI) * (i  - endI) + (j - endJ) * (j - endJ));
   if (distance < min) {
    min = distance;
    xRed = XD;
    yRed = YD;
    counter++;
   }
  }
  //right
  i = (((XR  - 430) / 40));
  j = (((YR - 60) / 40) - 1);
  movingAllowed = canMoveTo(XR + 40, YR);
  color = context.getImageData(XR , YR, 40, 40);
  blue = parseInt(color.data[2]);
  //add min dis and color at the end
  if (i >= 0 && j >= 0 && '2' == arrSolved[i][j] && 1 == movingAllowed && 255 == blue) {
   distance = Math.sqrt((i  - endI) * (i  - endI) + (j - endJ) * (j - endJ));
   if (distance < min) {
    min = distance;
    xRed = XR;
    yRed = YR;
    counter++
   }
  }
  //updating data for next iteration in case the suggestion was not found
  XL = XL - 40;
  YU = YU - 40;
  YD = YD + 40;
  XR = XR + 40;
  //that mines there is a suggestion so the while loop should stop
  if(counter != 0){
   run = 0;
  }
  counter = 0;
 }
 //draw the suggestion on board
 context.fillStyle = "#FC2828";
 context.fillRect(xRed, yRed, 40, 40);
}


//when the game starts hidde the image and set event listner to keyboard
document.getElementById("myImg").style.visibility = "hidden";
window.addEventListener("keydown", move);
