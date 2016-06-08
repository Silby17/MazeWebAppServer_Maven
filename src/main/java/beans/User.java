package beans;

import javax.servlet.ServletContext;
import java.io.*;

public class User implements Serializable{
    private String userName;
    private String password;
    private String name;
    private String email;
    private String icon;
    private ServerConnectionManager connectionManager;


    public User(){}

    public User(String usrName, String pswrd, String name,
                String email, String icon) {
        this.userName = usrName;
        this.password = pswrd;
        this.name = name;
        this.email = email;
        this.icon = icon;
        this.connectionManager = new ServerConnectionManager();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public ServerConnectionManager getConnectionManager() {
        return connectionManager;
    }

    public void setConnectionManager(ServerConnectionManager connectionManager) {
        this.connectionManager = connectionManager;
    }
}