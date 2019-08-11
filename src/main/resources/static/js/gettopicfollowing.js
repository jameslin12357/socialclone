const topicfollowingmodaltoggleopen = document.getElementById("topicfollowingmodaltoggleopen");
const topicfollowingmodal = document.getElementById("topicfollowingmodal");
const topicfollowingmodaltoggleclose = document.getElementById("topicfollowingmodaltoggleclose");
const topicfollowingmodalbody = document.getElementById("topicfollowingmodalbody");

//var dataretrieved = false;
topicfollowingmodaltoggleopen.addEventListener('click', function (e) {
    //if (dataretrieved == false) {
        //dataretrieved = true;
        var req = new XMLHttpRequest();
        const url = window.location.href;
        const indexStart = url.lastIndexOf("/") + 1;
        const id = url.substring(indexStart)
        const urlconfirmed = `/topicfollowing/details/${id}`;
        req.open("GET", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                // loop over array and insert data into hidden modal and display modal when done
                for (var i = 0; i < data["ds"].length; i++) {
                    // pull needed values from selected fields (id, username, imageurl)
                    var id = data["ds"][i]["ID"];
                    var username = data["ds"][i]["USERNAME"];
                    var imageurl = data["ds"][i]["IMAGEURL"];
                    var div = document.createElement("div");
                    div.classList.add("media");
                    div.classList.add("mb-15");
                    var link = document.createElement("a");
                    link.setAttribute("href", `/users/details/${id}`);
                    link.classList.add("mr-3")
                    var img = document.createElement("img");
                    img.setAttribute("src", imageurl);
                    img.classList.add("avatarSmall");
                    link.append(img);
                    div.append(link);
                    var div2 = document.createElement("div");
                    var link2 = document.createElement("a");
                    link2.setAttribute("href", `/users/details/${id}`);
                    var h5 = document.createElement("h5");
                    h5.innerText = username;
                    link2.append(h5);
                    div2.appendChild(link2);
                    div.appendChild(div2);
                    topicfollowingmodalbody.appendChild(div);
                }
            }
        }
        req.send();
    //}
    topicfollowingmodal.classList.add("Shown");
    // send ajax request to get data and place returned data into modal then open modal
    // select * from users where id in (select following from topicfollowing where followed = topicid)
});

topicfollowingmodaltoggleclose.addEventListener('click', function (e) {
    topicfollowingmodalbody.innerHTML = "";
    topicfollowingmodal.classList.remove("Shown");
    // close modal which already contains data from ajax request
});

