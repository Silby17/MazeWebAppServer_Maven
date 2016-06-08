var mazeFromServer;
var nameOfGame;
var gameInPlay = false;
var otherMove;
var getMazeInterval;
var getPlayerMove;

/*
This Method will start at the running of the window, it will check if there
is a new maze to be played
 */
$(function start(){
   $('.loader').show();
    getMazeInterval = setInterval(function () {getMaze()}, 3000);
});


/*
This will check with the servlet if there is a new JSON object
 */
function getMaze(){
    $.getJSON("GetMulti", function(data){
        if(data.multiMaze != 0){
            mazeFromServer = data.multiMaze;
            drawBothMazes();
            getMoveFromServer();
        }
    })
}


/*
This method will draw both Mazes onto the canvas
 */
function drawBothMazes(){
    var object = JSON.parse(mazeFromServer);
    nameOfGame = object.Name;
    DrawMaze(object.You.Maze, object.You.Start.Row, object.You.Start.Col,
        object.You.End.Row,object.You.End.Col, object.Other.Start.Row,
        object.Other.Start.Col, object.Other.End.Row, object.Other.End.Col);
    $('.loader').hide();
    clearInterval(getMazeInterval);
};


/*
This method will check using long Polling if there is a new move from the
opponent
 */
function getMoveFromServer(){
    $.ajax({
        url: 'GetPlayerMove',
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function(data){
            if(data.playerMove != 0){
                otherMove = data.playerMove;
                var moveObject = JSON.parse(otherMove);
                oppMoves(moveObject.Move);
            }
            getPlayerMove = setTimeout(function() {getMoveFromServer()}, 1000);
        },
        error: function(data){
            getPlayerMove = setTimeout(function() {getMoveFromServer()}, 1000);
        }
    });
}


/*
This Will close the current Game on button Click
 */
$('#returnBtn').click(function(){
    clearTimeout(getPlayerMove);
   closeGame();
});


/*
This will send the ajax object to the CloseGameServlet using POST
 */
function closeGame(){
    var name = {"gameName" : nameOfGame};
    $.ajax({
        url: 'Close',
        type: 'POST',
        data: name
    })
    window.location = "menu"
}