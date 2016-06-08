package controllers;

import beans.User;
import org.json.simple.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "controllers.SingleSolutionServlet", urlPatterns = {"SingleSolutionServlet"})
public class SingleSolutionServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        User currentUser = (User)request.getSession().getAttribute("user");
        System.out.println("In doGet of singleSolution");
        String name = request.getParameter("name");
        System.out.println(name);
        String solCommand = 2 + " " + name + " " + 1;
        currentUser.getConnectionManager().sendRequest(solCommand);

        String solution = currentUser.getConnectionManager().getMsgFromServer();

        //Checks if the JSON received is in the correct format
        if(solution.charAt(233) == '\n' &&
                solution.charAt(234) == '}'){
            solution = solution.substring(0, 234);
            solution += "}";
        } else{
            solution = solution.substring(0, 234);
        }

        JSONObject obj = new JSONObject();
        obj.put("singleSol", solution);
        response.setContentType("application/json");
        response.getWriter().println(obj);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}