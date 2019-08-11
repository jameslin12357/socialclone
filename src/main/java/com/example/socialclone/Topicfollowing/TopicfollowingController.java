package com.example.socialclone.Topicfollowing;

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
import org.springframework.web.bind.annotation.RestController;
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


@RestController

public class TopicfollowingController {



    @GetMapping("/topicfollowing/details2/{id}")
    public String details(HttpServletRequest request, HttpServletResponse response, Model model, @PathVariable Long id) {
        // call function to setup session
        HttpServletRequest requestF = Session.sessionSetup(request, response);
        Map<String, String> session = (Map<String, String>) requestF.getAttribute("session");
        String rows = Oracle.QueryInJSON("select * from topics t inner join topicfollowing tf on t.id = tf.followed where tf.following = '" + id + "' order by tf.created desc");
        if (rows.length() == 0){
            model.addAttribute("title", "404");
            model.addAttribute("sess", session);
            return "Errors/404";
        } else {
                return rows;
            }
        }
    }