<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Main Menu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/skeleton.css">
    <link rel="stylesheet" href="css/mainMenu.css">
</head>
<body>
<form action="Logout">
<ul div style="float: right" class="ul userInfo">
    <li >
        </div>
        <button type="submit" formaction="Logout" formmethod="post">Logout</button>
        </div>
    </li>
    <li>
        <% String icon = "images/Icons/";
         String iconName = (String)session.getAttribute("icon");
         icon += iconName;
         {%> <div style="float: right" id="userImage">
            <img src="<%=icon%>"/>
        </div><%}%>
    <li>
    <% String username = (String) session.getAttribute("username");
        {%>
    <label><%=username%></label>
    <%}%>
    </li>
</ul>
</form>

<div class="form-bg">
    <form action="menu" method="post">
        <h2>Main Menu</h2>
        <button type="submit" name="action" value="single">Single Player</button>
        <button type="submit" name="action" value="multiplayer">Multiplayer</button>
    </form>
</div>
</div>
</body>
</html>