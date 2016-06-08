package controllers;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*********************************************************************
 * This Class is the Servlet that will deal with the Main Game Menu
 *********************************************************************/
@WebServlet(name = "controllers.MenuServlet", urlPatterns = {"menu"})
public class MenuServlet extends HttpServlet {

    /******************************************************************
     * This method gets the info that was posted from the html file
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     ******************************************************************/
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String buttonClicked = request.getParameter("action");
        if(buttonClicked.equals("single")){
            response.sendRedirect("SinglePlayer.jsp");
        }
        else if(buttonClicked.equals("multiplayer"))
            response.sendRedirect("EnterGameName.jsp");
    }

    /************************************************************************
     * This method will get the html file to send to the client to display
     * @param request - the request info
     * @param response - the response info
     * @throws ServletException
     * @throws IOException
     ************************************************************************/
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("MainMenu.jsp");
    }
}