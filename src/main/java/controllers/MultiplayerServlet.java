package controllers;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*****************************************************************************
 * This will call the Multiplayer jsp file
 ****************************************************************************/
@WebServlet(name = "controllers.MultiplayerServlet", urlPatterns = {"MultiplayerServlet"})
public class MultiplayerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("Multiplayer.jsp");
    }
}