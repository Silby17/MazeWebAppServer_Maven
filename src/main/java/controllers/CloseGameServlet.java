package controllers;

import beans.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*****************************************************************************
 * This class will handle the closing of the Multiplayer game with the Server
 *****************************************************************************/
@WebServlet(name = "controllers.CloseGameServlet", urlPatterns = {"Close"})
public class CloseGameServlet extends HttpServlet {

    /*************************************************************************
     * This method will get the name of the game from the request
     * and send a close request to the server
     * @param request - request from client
     * @param response - response to send
     * @throws ServletException
     * @throws IOException
     *************************************************************************/
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("In close Game Servlet");
        User user = (User)request.getSession().getAttribute("user");
        String fromClient = request.getParameter("gameName");
        System.out.println("string from Client");
        String closeCommand = 5 + " " + fromClient;
        user.getConnectionManager().sendRequest(closeCommand);
        System.out.println("Sending menu redirect");
        response.sendRedirect("menu");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}
