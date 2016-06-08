package controllers;

import beans.User;
import org.json.simple.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;


@WebServlet(name = "controllers.SingleMazeServlet", urlPatterns = {"SingleMazeServlet"})
public class SingleMazeServlet extends HttpServlet {


    /***********************************************************************
     * This is the doGet method that will be used in order to get the maze
     * from the Server
     * @param request - request received
     * @param response - response
     * @throws ServletException -
     * @throws IOException - for the writer
     ***********************************************************************/
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        User currentUser = (User)request.getSession().getAttribute("user");

        //Makes a random number for the Maze Name
        Random rand = new Random();
        int randNum = rand.nextInt(40);
        String number = Integer.toString(randNum);
        String singleCommand = "1 Game";
        singleCommand += number + " " + 0;

        //Sends the command for a new maze to the server
        String mazeFromServer = currentUser.getConnectionManager().sendToServer(singleCommand);
        String mazeString;

        //Checks if the JSON received is in the correct format
        if(mazeFromServer.charAt(233) == '\n' &&
                mazeFromServer.charAt(234) == '}'){
            mazeString = mazeFromServer.substring(0, 234);
            mazeString += "}";
        } else{
            mazeString = mazeFromServer.substring(0, 234);
        }

        JSONObject object = new JSONObject();
        object.put("singleMaze", mazeString);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.println(object);
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}