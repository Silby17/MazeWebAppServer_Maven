package controllers;

import beans.DBManager;
import beans.User;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "controllers.LoginServlet", urlPatterns = {"login"})
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("login.jsp");
    }


    /*************************************************************************
     * This Method will handle all information that was posted from the Login
     * page after the user enters their details
     * @param request - page request
     * @param response - response to that page
     * @throws ServletException if there is an error with the servelt
     * @throws IOException - Error writing.
     *************************************************************************/
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ServletContext context = getServletContext();
        Object att = context.getAttribute("database");
        DBManager manager = (DBManager)att;
        String userName = request.getParameter("username");
        String password = request.getParameter("password");

        if(manager.checkLoginDetails(userName, password)){
            User currentUser = manager.getUser(userName);
            currentUser.getConnectionManager().connect();
            HttpSession session = request.getSession();
            session.setAttribute("user", currentUser);
            session.setAttribute("username", userName);
            session.setAttribute("icon", currentUser.getIcon());
            response.sendRedirect("menu");
        }
        else{
            request.setAttribute("error", true);
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}