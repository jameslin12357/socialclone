package com.example.socialclone.Logins;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.lang.Class;
import java.io.*;
import java.net.URLDecoder;
import java.sql.*;
import com.example.socialclone.Oracle;
import com.example.socialclone.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.Model;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import redis.clients.jedis.Jedis;

@Controller

public class LoginsController {

    @GetMapping("/logins/create")
    public String createGet(HttpServletRequest request, HttpServletResponse response, Model model) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        if (session.get("isAuthenticated").equals("false")){
            model.addAttribute("title", "Log in");
            model.addAttribute("sess", session);
            return "Logins/Create";
        }
        else {
            return "redirect:/home";
        }
    }

    @PostMapping("/logins/create")
    public String create(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody String body) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        if (session.get("isAuthenticated").equals("false")){
            String[] data = body.split("&");
            String email = data[0].split("=")[1];
            String password = data[1].split("=")[1];
            try
            {
                email = URLDecoder.decode(email,"utf-8");
            } catch (UnsupportedEncodingException e)
            {
                e.printStackTrace();
            }
            System.out.println(body);
            System.out.println(email);
            System.out.println(password);
            System.out.println("select id, email, password, username from users where email = '" + email + "'");
            ArrayList<ArrayList<String>> rows = Oracle.Query("select id, email, password, username from users where email = '" + email + "'");

            if (rows.isEmpty() || !(rows.get(0).get(2).equals(password))){
                model.addAttribute("title", "Log in");
                model.addAttribute("sess", session);
                model.addAttribute("emailField", email);
                return "Logins/Error";
            } else {
                var cookies = request.getCookies();
                String cookieValue = cookies[0].getValue();
                Jedis jedis = new Jedis("localhost");
                Map<String, String> sessionUpdated = new HashMap<String, String>();
                sessionUpdated.put("isAuthenticated", "true");
                sessionUpdated.put("id", rows.get(0).get(0));
                sessionUpdated.put("email", rows.get(0).get(1));
                sessionUpdated.put("username", rows.get(0).get(3));
                jedis.hmset(cookieValue, sessionUpdated);
                return "redirect:/home";
            }
//            System.out.println(rows);
//            model.addAttribute("title", "Log in");
//            model.addAttribute("sess", session);
//            return "Logins/Create";
//            ArrayList<ArrayList<String>> rows = Oracle.Query("select p.id,p.name,p.description,p.imageurl,p.created,p.userid,p.topicid,u.username,t.name as topicname from posts p inner join users u on p.userid = u.id inner join topics t on p.topicid = t.id order by p.created desc");

//            model.addAttribute("rows", rows);
        }
        else {
            return "redirect:/home";
        }
    }

}

