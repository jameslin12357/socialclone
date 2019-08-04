package com.example.socialclone;

import redis.clients.jedis.Jedis;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Session {
    public static HttpServletRequest sessionSetup(HttpServletRequest request, HttpServletResponse response) {
        var cookies = request.getCookies();
        if (cookies == null) {
            String sid = UUID.randomUUID().toString();
            Map<String, String> session = new HashMap<String, String>();
            session.put("isAuthenticated", "false");
            session.put("id", "false");
            session.put("email", "false");
            session.put("username", "false");
            session.put("emaile", "Hidden");
            session.put("emailinvalid", "Hidden");
            session.put("passworde", "Hidden");
            session.put("passwordshort", "Hidden");
            session.put("usernamee", "Hidden");
            session.put("emailfield", "");
            session.put("usernamefield", "");
            session.put("registeralert", "Hidden");
            session.put("emailnotfound", "Hidden");
            session.put("passwordwrong", "Hidden");
            session.put("loginemailfield", "");
            session.put("profileusernamee", "Hidden");
            session.put("profiledescriptione", "Hidden");
            session.put("profileusernamefield", "");
            session.put("profiledescriptionfield", "");
            session.put("profilechanged", "false");
            session.put("profileupdatedalert", "Hidden");
            session.put("profiledeletedalert", "Hidden");
            session.put("postnamee", "Hidden");
            session.put("postdescriptione", "Hidden");
            session.put("posttopicide", "Hidden");
            session.put("postnamefield", "");
            session.put("postdescriptionfield", "");
            session.put("posttopicidfield", "");
            session.put("postcreatedalert", "Hidden");
            session.put("updatedpostnamee", "Hidden");
            session.put("updatedpostdescriptione", "Hidden");
            session.put("updatedpostnamefield", "");
            session.put("updatedpostdescriptionfield", "");
            session.put("postchanged", "false");
            session.put("postupdatedalert", "Hidden");
            session.put("postdeletedalert", "Hidden");
            session.put("commentdeletedalert", "Hidden");
            Jedis jedis = new Jedis("localhost");
            jedis.hmset(sid, session);
            Cookie cookie = new Cookie("sid", sid);
            response.addCookie(cookie);
            request.setAttribute("session", session);
        } else {
            String cookieValue = cookies[0].getValue();
            Jedis jedis = new Jedis("localhost");
            Map<String, String> hashData = jedis.hgetAll(cookieValue);
            request.setAttribute("session", hashData);
        }
        return request;
    }
}


