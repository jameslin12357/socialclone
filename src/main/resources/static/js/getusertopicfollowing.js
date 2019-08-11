const usertopicfollowingmodaltoggleopen = document.getElementById("usertopicfollowingmodaltoggleopen");
const usertopicfollowingmodal = document.getElementById("usertopicfollowingmodal");
const usertopicfollowingmodaltoggleclose = document.getElementById("usertopicfollowingmodaltoggleclose");
const usertopicfollowingmodalbody = document.getElementById("usertopicfollowingmodalbody");

//var usertopicfollowingdataretrieved = false;
usertopicfollowingmodaltoggleopen.addEventListener('click', function (e) {
    //if (usertopicfollowingdataretrieved == false) {
        //usertopicfollowingdataretrieved = true;
        var req = new XMLHttpRequest();
        const url = window.location.href;
        const indexStart = url.lastIndexOf("/") + 1;
        const id = url.substring(indexStart)
        const urlconfirmed = `/topicfollowing/details2/${id}`;
        req.open("GET", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                // loop over array and insert data into hidden modal and display modal when done
                for (var i = 0; i < data["ds"].length; i++) {
                    // pull needed values from selected fields (id, name, imageurl)
                    var id = data["ds"][i]["ID"];
                    var username = data["ds"][i]["NAME"];
                    var imageurl = data["ds"][i]["IMAGEURL"];
                    var div = document.createElement("div");
                    div.classList.add("media");
                    div.classList.add("mb-15");
                    var link = document.createElement("a");
                    link.setAttribute("href", `/topics/details/${id}`);
                    link.classList.add("mr-3")
                    var img = document.createElement("img");
                    img.setAttribute("src", imageurl);
                    img.classList.add("avatarSmall");
                    link.append(img);
                    div.append(link);
                    var div2 = document.createElement("div");
                    var link2 = document.createElement("a");
                    link2.setAttribute("href", `/topics/details/${id}`);
                    var h5 = document.createElement("h5");
                    h5.innerText = username;
                    link2.append(h5);
                    div2.appendChild(link2);
                    div.appendChild(div2);
                    usertopicfollowingmodalbody.appendChild(div);
                }
            }
        }
        req.send();
    //}
    usertopicfollowingmodal.classList.add("Shown");
    // send ajax request to get data and place returned data into modal then open modal
    // select * from users where id in (select following from topicfollowing where followed = topicid)
});

usertopicfollowingmodaltoggleclose.addEventListener('click', function (e) {
    usertopicfollowingmodalbody.innerHTML = "";
    usertopicfollowingmodal.classList.remove("Shown");
    // close modal which already contains data from ajax request
});

