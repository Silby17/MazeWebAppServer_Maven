package controllers;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import beans.DBManager;
import beans.User;


/******************************************************************************
 * This Class will initialize the Contexts and add attributes that will be
 * able to be accessed throughout the application
 *****************************************************************************/
public class ServletContextManager implements ServletContextListener {
    private DBManager dbManager;


    /*************************************************************************
     * Initialization method that will initialize the Server Connection
     * as well as the DataBase manager
     * @param servletContextEvent
     ************************************************************************/
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("Context Initialize is Starting-up");
        ServletContext context = servletContextEvent.getServletContext();
        this.dbManager = new DBManager();
        context.setAttribute("database", dbManager);
        System.out.println("Context initialized Successfully");
    }


    /************************************************************************
     * This method will destroy the context at the end of the running
     * of the application
     * @param servletContextEvent
     ***********************************************************************/
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Context destroyed");
    }
}