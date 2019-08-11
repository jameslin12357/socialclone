const userfollowunfollowbutton = document.getElementById("userfollowunfollowbutton");
const datauserid = document.getElementById("datauserid");
const userfollowerscount = document.getElementById("userfollowerscount");

userfollowunfollowbutton.addEventListener('click', function (e) {
    var followedstatus = userfollowunfollowbutton.innerText;
    if (followedstatus == "Follow") {
        // send ajax post request to create topicfollowing entry (need current user id and topic id)
        var currentuser = document.getElementById("currentuser");
        var currentuserurl = currentuser.getAttribute("href");
        const indexStart = currentuserurl.lastIndexOf("/") + 1;
        const userid = currentuserurl.substring(indexStart);
        const rid = datauserid.getAttribute("data-user-id");
        //var postdata = new FormData();
        //postdata.append('userid', userid);
        //postdata.append('topicid', topicid);
        var postdata = `userid=${userid}&rid=${rid}`;
        var urlconfirmed = `/userfollowing/create`;
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                userfollowunfollowbutton.innerText = "Unfollow";
                userfollowerscount.innerText = (Number(userfollowerscount.innerText) + 1).toString();
            }
        }
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(postdata);
    } else {
        // send ajax post request to delete topicfollowing entry
        var currentuser = document.getElementById("currentuser");
        var currentuserurl = currentuser.getAttribute("href");
        const indexStart = currentuserurl.lastIndexOf("/") + 1;
        const userid = currentuserurl.substring(indexStart);
        const rid = datauserid.getAttribute("data-user-id");
        var postdata = `userid=${userid}&rid=${rid}`;
        var urlconfirmed = `/userfollowing/delete`;
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                userfollowunfollowbutton.innerText = "Follow";
                userfollowerscount.innerText = (Number(userfollowerscount.innerText) - 1).toString();
            }
        }
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(postdata);
    }
});

