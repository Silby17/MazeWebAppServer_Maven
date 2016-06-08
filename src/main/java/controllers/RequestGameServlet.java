package controllers;

import beans.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*****************************************************************************
 * This Servlet will be the controller for the JSP that will send the Game
 * Name for a multiplayer game to the server
 *****************************************************************************/
@WebServlet(name = "controllers.RequestGameServlet", urlPatterns = {"RequestGameServlet"})
public class RequestGameServlet extends HttpServlet {

    /**************************************************************************
     * This method will send the Multiplayer game request to the server
     * @param request - request received
     * @param response - response
     * @throws ServletException - if the servlet fails
     * @throws IOException - If writing to response fails
     *************************************************************************/
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String gameName = request.getParameter("gameName");
        String command = "3 " + gameName;
        command = command.replaceAll("(\\r|\\n|\\t)", "");
        User user = (User)request.getSession().getAttribute("user");
        user.getConnectionManager().sendRequest(command);
        response.sendRedirect("Multiplayer.jsp");
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}