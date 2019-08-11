package com.example.socialclone.Users;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.lang.Class;
import java.io.*;
import java.net.URLDecoder;
import java.sql.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.example.socialclone.Oracle;
import com.example.socialclone.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.ui.Model;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import redis.clients.jedis.Jedis;

@Controller
public class UsersController {

    public static boolean isValid(String email)
    {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+
                "[a-zA-Z0-9_+&*-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                "A-Z]{2,7}$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }

    @GetMapping("/users/create")
    public String createGet(HttpServletRequest request, HttpServletResponse response, Model model) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        if (session.get("isAuthenticated").equals("false")){
            model.addAttribute("title", "Register");
            model.addAttribute("sess", session);
            return "Users/Create";
        }
        else {
            return "redirect:/home";
        }
    }

    @PostMapping("/users/create")
    public String create(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody String body) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        if (session.get("isAuthenticated").equals("false")){
            String[] data = body.split("&");
            String[] emailO = data[0].split("=");
            String email = "";
            if (emailO.length != 1){
                email = emailO[1];
            }
            String[] passwordO = data[1].split("=");
            String password = "";
            if (passwordO.length != 1){
                password = passwordO[1];
            }
            String[] usernameO = data[2].split("=");
            String username = "";
            if (usernameO.length != 1){
                username = usernameO[1];
            }
            //String email = data[0].split("=")[1];
            //String password = data[1].split("=")[1];
            //String username = data[2].split("=")[1];
            try
            {
                email = URLDecoder.decode(email,"utf-8");
            } catch (UnsupportedEncodingException e)
            {
                e.printStackTrace();
            }

            //ArrayList<ArrayList<String>> rows = Oracle.Query("select id, email, password, username from users where email = '" + email + "'");
            ArrayList<String> errors = new ArrayList<String>();

            if (email.length() == 0){
                errors.add("emaile");
            }
            if (password.length() == 0){
                errors.add("passworde");
            }
            if (username.length() == 0){
                errors.add("usernamee");
            }
            if (!isValid(email)){
                errors.add("emailinvalid");
            }
            if (password.length() < 8){
                errors.add("passwordshort");
            }
            if (!errors.isEmpty()){
                model.addAttribute("title", "Register");
                model.addAttribute("sess", session);
                model.addAttribute("emailField", email);
                model.addAttribute("usernameField", username);
                model.addAttribute("errors", errors);
                return "Users/Error";
            } else {
                email = email.trim();
                password = password.trim();
                username = username.trim();
                ArrayList<ArrayList<String>> rows = Oracle.Query("begin insert into users (email, password, username) values ('" + email + "','" + password + "','" + username + "');commit;end;");
                model.addAttribute("title", "Log in");
                model.addAttribute("sess", session);
                return "Logins/Success";
            }

        }
        else {
            return "redirect:/home";
        }
    }

    @GetMapping("/users/details/{id}")
    public String details(HttpServletRequest request, HttpServletResponse response, Model model, @PathVariable Long id) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        System.out.println("select * from users where id = '" + id + "';");
        ArrayList<ArrayList<String>> rows = Oracle.Query("select * from users where id = '" + id + "'");
        ArrayList<ArrayList<String>> posts = Oracle.Query("select p.id,p.name,p.description,p.imageurl,p.created,p.userid,p.topicid,u.username,t.name as topicname from posts p inner join users u on p.userid = u.id inner join topics t on p.topicid = t.id where userid = '" + id + "' order by created desc");
        String postscount = Oracle.Query("select count(*) as count from posts where userid = '" + id + "'").get(0).get(0);
        String topicscount = Oracle.Query("select count(*) as count from topicfollowing where following = '" + id + "'").get(0).get(0);
        String userfollowingcount = Oracle.Query("select count(*) as count from userfollowing where following = '" + id + "'").get(0).get(0);
        String userfollowedcount = Oracle.Query("select count(*) as count from userfollowing where followed = '" + id + "'").get(0).get(0);
        String likescount = Oracle.Query("select count(*) as count from liks where lik = '" + id + "'").get(0).get(0);
        String commentscount = Oracle.Query("select count(*) as count from comments where userid = '" + id + "'").get(0).get(0);



        if (rows.isEmpty()){
            model.addAttribute("title", "404");
            model.addAttribute("sess", session);
            return "Errors/404";
        } else {
            model.addAttribute("title", "Profile");
            model.addAttribute("sess", session);
            model.addAttribute("rows", rows);
            model.addAttribute("posts", posts);
            model.addAttribute("postscount", postscount);
            model.addAttribute("topicscount", topicscount);
            model.addAttribute("userfollowingcount", userfollowingcount);
            model.addAttribute("userfollowedcount", userfollowedcount);
            model.addAttribute("likescount", likescount);
            model.addAttribute("commentscount", commentscount);
            if (session.get("isAuthenticated").equals("true") && !(session.get("id").equals(rows.get(0).get(0)))){
                model.addAttribute("follow", true);
                String statusFollowed = Oracle.Query("select count(*) as count from userfollowing where following = '" + session.get("id") + "' and followed = '" + rows.get(0).get(0) + "'").get(0).get(0);
                if (statusFollowed.equals("0")){
                    model.addAttribute("statusFollowed","Follow");
                } else {
                    model.addAttribute("statusFollowed","Unfollow");
                }
            }
            return "Users/Details";
        }


    }

}