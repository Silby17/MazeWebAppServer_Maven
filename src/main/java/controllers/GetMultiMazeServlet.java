package controllers;

import beans.User;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(name = "controllers.GetMultiMazeServlet", urlPatterns = {"GetMulti"})
public class GetMultiMazeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        User user = (User)request.getSession().getAttribute("user");
        String jsonString = user.getConnectionManager().getMsgFromServer();
        jsonString = jsonString.replaceAll("(\\r|\\n)", "");

        int i = 520;
        int j = 521;
        boolean end = true;
        while(end){
            if(jsonString.charAt(i) == '}' && jsonString.charAt(j) == '}'){
                jsonString = jsonString.substring(0, j + 1);
                end = false;
            }
            else{
                i++;
                j++;
            }
        }
        JSONObject object = new JSONObject();
        object.put("multiMaze", jsonString);
        response.getWriter().println(object);
        response.setContentType("application/json");
    }
}
