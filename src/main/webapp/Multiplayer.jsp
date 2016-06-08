<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="css/mainMenu.css">
    <title>Multiplayer</title>
</head>
<body background="images/bg.jpg">
<div class="loader" style="display: none"></div>
<form>
<ul style="float:right">
    <li><button formaction="Logout" type="submit"
                formmethod="post">Logout</button></li>
    <li> <% String icon = "images/Icons/";
        String iconName = (String)session.getAttribute("icon");
        icon += iconName;
        {%> <div style="float: right" id="userImage">
        <img src="<%=icon%>"/>
    </div><%}%></li>
    <li><% String username = (String) session.getAttribute("username");
        {%>
        <label><%=username%></label>
        <%}%></li>
</ul>
</form>

<div class="btn-group" style="float: left" >
    <form action="MultiplayerServlet" method="post">
        <button id="getSuggestionBtn" type="button"
                name="action">Get Suggestion</button>
        <button id="returnBtn" type="button" name="action"
                value="return">Return to Main Menu</button>
        <button id="getMazeBtn" type="button" name="action"
                style="visibility: hidden">Start New Game</button>
        <input type="text" id="inputMazeName"  style="visibility: hidden"
               placeholder="Enter Maze Name">
    </form>
</div>

<canvas id="myCanvas" width="1200" height="550"></canvas>
<!--img id="oppImg" src="images/Icons/oppImg.png" width="40" height="40"
     style="float:left" style="visibility: hidden" align="center"/-->
<%
    {%><img id="oppImg" src="images/Icons/oppImg.png" width="40" height="40"
            style="float:left" style="visibility: hidden" align="center"/> <%
    }
%>
<!--The following code will get the icon from the current users session-->
<%
    {%><img id="myImg" src="<%=icon%>" width="40" height="40"
            style="float:left" style="visibility: hidden" align="center"/> <%
    }
%>
<script src="./jquery-2.2.4.js"></script>
<script src = "MultiAction.js"></script>
<script src="Multiplayer.js"></script>
</body>
</html>