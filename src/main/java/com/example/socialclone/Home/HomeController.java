package com.example.socialclone.Home;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.lang.Class;
import com.example.socialclone.Oracle;
import com.example.socialclone.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import redis.clients.jedis.Jedis;

import java.sql.*;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        if (session.get("isAuthenticated").equals("false")){
            ArrayList<ArrayList<String>> rows = Oracle.Query("select p.id,p.name,p.description,p.imageurl,p.created,p.userid,p.topicid,u.username,t.name as topicname from posts p inner join users u on p.userid = u.id inner join topics t on p.topicid = t.id order by p.created desc");
            model.addAttribute("title", "Home");
            model.addAttribute("sess", session);
            model.addAttribute("rows", rows);
        }
     else {
            ArrayList<ArrayList<String>> rows = Oracle.Query("select p.id,p.name,p.description,p.imageurl,p.created,p.userid,p.topicid,u.username,t.name as topicname from posts p inner join users u on p.userid = u.id inner join topics t on p.topicid = t.id where p.topicid in (select followed from topicfollowing where following = " + session.get("id") + ") order by created desc");
            model.addAttribute("title", "Home");
            model.addAttribute("sess", session);
            model.addAttribute("rows", rows);
        }
        return "Home/Index";
    }
}

