package controllers;

import beans.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*****************************************************************************
 * This class Will handle the sending of a players move to the server
 *****************************************************************************/
@WebServlet(name = "controllers.SendMoveServlet", urlPatterns = {"SendMoveServlet"})
public class SendMoveServlet extends HttpServlet {

    /**************************************************************************
     * This method will get information about the move from the player
     * and send the move to the Game Server
     * @param request - request from the client that will have the move
     * @param response - response to send
     * @throws ServletException - Throws exception if there is an error
     * @throws IOException - Error IO
     *************************************************************************/
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String moveCommand = 4 + " ";
        String move = request.getParameter("move");
        moveCommand += move;
        User user = (User)request.getSession().getAttribute("user");
        user.getConnectionManager().sendRequest(moveCommand);
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}
