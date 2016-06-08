package controllers;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/****************************************************************************
 * This class will handle button clicks on the SinglePlayer window
 ****************************************************************************/
@WebServlet(name = "controllers.SinglePlayerButtonHandlerServlet",
        urlPatterns = {"SinglePlayerButtonHandlerServlet"})
public class SinglePlayerButtonHandlerServlet extends HttpServlet {

    /*************************************************************************
     * This method will receive the post from the client
     * @param request - from client
     * @param response - to send
     * @throws ServletException - throws exception
     * @throws IOException
     *************************************************************************/
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //Gets the Button value that was posted
        String buttonClick = request.getParameter("action");

        //Checks if the button clicked was to go back to the main menu
        // if it was then return to the  main menu
        if(buttonClick.equals("return")){
            response.sendRedirect("menu");
        }
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}