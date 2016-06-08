<!doctype html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Login Form</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/skeleton.css">
    <link rel="stylesheet" href="css/layout.css">

</head>
<body>
<div class="container">
    <div class="form-small">
        <form action="login" method="post">
            <h2>Login</h2>
            <p><input type="text" placeholder="Username" name="username"></p>
            <p><input type="password" placeholder="Password" name="password"></p>
            <% if(request.getAttribute("error") != null &&
                    (Boolean)request.getAttribute("error")) {%>
            <label name="wrongDetails">
                <span>Username or Password are incorrect</span>
            </label>
            <%} %>
            <button type="submit">Login</button>
        </form>
    </div>
    <p class="forgot">New beans.User? <a  href=SignUpForm.html>Click here to Sign up it.</a></p>
</div>
</body>
</html>