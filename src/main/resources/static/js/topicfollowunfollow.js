const topicfollowunfollowbutton = document.getElementById("topicfollowunfollowbutton");
const datatopicid = document.getElementById("datatopicid");
const topicfollowingcount = document.getElementById("topicfollowingcount");

topicfollowunfollowbutton.addEventListener('click', function (e) {
    var followedstatus = topicfollowunfollowbutton.innerText;
    if (followedstatus == "Follow") {
        // send ajax post request to create topicfollowing entry (need current user id and topic id)
        var currentuser = document.getElementById("currentuser");
        var currentuserurl = currentuser.getAttribute("href");
        const indexStart = currentuserurl.lastIndexOf("/") + 1;
        const userid = currentuserurl.substring(indexStart);
        const topicid = datatopicid.getAttribute("data-topic-id");
        //var postdata = new FormData();
        //postdata.append('userid', userid);
        //postdata.append('topicid', topicid);
        var postdata = `userid=${userid}&topicid=${topicid}`;
        var urlconfirmed = `/topicfollowing/create`;
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                topicfollowunfollowbutton.innerText = "Unfollow";
                topicfollowingcount.innerText = (Number(topicfollowingcount.innerText) + 1).toString();
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
        const topicid = datatopicid.getAttribute("data-topic-id");
        var postdata = `userid=${userid}&topicid=${topicid}`;
        var urlconfirmed = `/topicfollowing/delete`;
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                topicfollowunfollowbutton.innerText = "Follow";
                topicfollowingcount.innerText = (Number(topicfollowingcount.innerText) - 1).toString();
            }
        }
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(postdata);
    }
});

