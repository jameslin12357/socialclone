const postlikeunlikebutton = document.getElementById("postlikeunlikebutton");
const datauserid = document.getElementById("datauserid");
const datarid = document.getElementById("datarid");
const postlikescount = document.getElementById("postlikescount");

postlikeunlikebutton.addEventListener('click', function (e) {
    var likedstatus = postlikeunlikebutton.innerText;
    if (likedstatus == "Like") {
        // send ajax post request to create topicfollowing entry (need current user id and topic id)
        /*var currentuser = document.getElementById("currentuser");
        var currentuserurl = currentuser.getAttribute("href");
        const indexStart = currentuserurl.lastIndexOf("/") + 1;
        const userid = currentuserurl.substring(indexStart);*/
        const userid = datauserid.getAttribute("data-user-id");
        const rid = datarid.getAttribute("data-r-id");
        //var postdata = new FormData();
        //postdata.append('userid', userid);
        //postdata.append('topicid', topicid);
        var postdata = `userid=${userid}&rid=${rid}`;
        var urlconfirmed = "/liks/create";
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                postlikeunlikebutton.innerText = "Unlike";
                postlikescount.innerText = (Number(postlikescount.innerText) + 1).toString();
            }
        }
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(postdata);
    } else {
        // send ajax post request to delete topicfollowing entry
        /*var currentuser = document.getElementById("currentuser");
        var currentuserurl = currentuser.getAttribute("href");
        const indexStart = currentuserurl.lastIndexOf("/") + 1;
        const userid = currentuserurl.substring(indexStart);
        const rid = datauserid.getAttribute("data-user-id");*/
        const userid = datauserid.getAttribute("data-user-id");
        const rid = datarid.getAttribute("data-r-id");
        var postdata = `userid=${userid}&rid=${rid}`;
        var urlconfirmed = "/liks/delete";
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                postlikeunlikebutton.innerText = "Like";
                postlikescount.innerText = (Number(postlikescount.innerText) - 1).toString();
            }
        }
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(postdata);
    }
});

