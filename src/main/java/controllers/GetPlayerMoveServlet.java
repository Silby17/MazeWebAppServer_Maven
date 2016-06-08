package controllers;

import beans.User;
import org.json.simple.JSONObject;
import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


/*****************************************************************************
 * This Servlet controller will be in charge of getting the other players move
 * asynchronously from the server
 ****************************************************************************/
@WebServlet(name = "controllers.GetPlayerMoveServlet", asyncSupported = true,
        urlPatterns = {"GetPlayerMove"})
public class GetPlayerMoveServlet extends HttpServlet {

    /************************************************************************
     * This method will start the running of the Asynchronous thread that will
     * check if the other player has moved
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     ************************************************************************/
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        boolean asyncSupported = request.isAsyncSupported();
        request.setAttribute("org.apache.catalina.ASYNC_SUPPORTED", true);
        asyncSupported = request.isAsyncSupported();

        if (asyncSupported) {
            AsyncContext asyncCtx = request.startAsync(request, response);
            asyncCtx.setTimeout(0); // => disable timeout
            AsyncRunnable thread = new AsyncRunnable(asyncCtx);
            asyncCtx.start(thread);
        }

    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {}
}

/*****************************************************************************
 * Runnable Class that will have a thread that runs the Asynchronous
 * communication in order to get the players Moves
 ****************************************************************************/
class AsyncRunnable implements Runnable{
    private final AsyncContext asyncContext;

    public AsyncRunnable(AsyncContext asContext){
        this.asyncContext = asContext;
    }

    public void run(){
        HttpServletResponse res = (HttpServletResponse)asyncContext.getResponse();
        HttpServletRequest req = (HttpServletRequest)asyncContext.getRequest();
        User user = (User)req.getSession().getAttribute("user");
        PrintWriter out = null;

        try{
            String fromServer = user.getConnectionManager().getMsgFromServer();
            fromServer = fromServer.replaceAll("(\\n|\\r)", "");

            int indexOfEnd = fromServer.indexOf('}');
            fromServer = fromServer.substring(0, indexOfEnd + 1);
            JSONObject obj = new JSONObject();
            obj.put("playerMove", fromServer);
            out = res.getWriter();
            out.println(obj);
            res.setContentType("application/json");
            asyncContext.complete();
        }catch(IOException e){
            e.printStackTrace();
        }
    }
}