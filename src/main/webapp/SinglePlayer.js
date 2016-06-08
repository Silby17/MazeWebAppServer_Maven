var current = 0;
var checkInterval;
var mazeFromServer;
var mazeName;
var gameInProgress = false;
var solution = 0;
var getSolutionInterval;

$(function(){
    $('#getMazeBtn').click(function(){
        if(confirm('Are you sure you want to start a new Game?')){
            $('.loader').show();
            checkInterval = setInterval(function() {getMaze()}, 8000);
        }
    });
});


$(function(){
    $('#getSolution').click(function(){
        if(confirm('Do you want to get a Suggestion?')){
            $('.loader').show();
            getSolutionInterval = setInterval(function() {getSolution()}, 8000);
        }
    })
});

function getMaze(){
    $.getJSON("SingleMazeServlet", function(data){
        if (data.singleMaze != current){
            mazeFromServer = data.singleMaze;
        }
        stopJSONCheck();
    })
}
function getSolution() {
    $.getJSON("SingleSolutionServlet", {name : mazeName}, function(data){
        if(data.singleSol != solution){
            solution = data.singleSol;
        }
        stopSolCheck();
    })
}

function stopJSONCheck() {
    clearInterval(checkInterval);
    $('.loader').hide();
    gameInProgress = true;
    var ob = JSON.parse(mazeFromServer);
    mazeName = ob.Name;
    DrawMaze(ob.Maze, ob.Start.Row, ob.Start.Col, ob.End.Row, ob.End.Col);
}


function stopSolCheck(){
    clearInterval(getSolutionInterval);
    $('.loader').hide();
    var solutionObject = JSON.parse(solution);
    console.log(solutionObject);
    SetSolveArray(solutionObject.Maze);
}