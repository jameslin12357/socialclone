const postlikesmodaltoggleopen = document.getElementById("postlikesmodaltoggleopen");
const postlikesmodal = document.getElementById("postlikesmodal");
const postlikesmodaltoggleclose = document.getElementById("postlikesmodaltoggleclose");
const postlikesmodalbody = document.getElementById("postlikesmodalbody");

//var postlikesdataretrieved = false;
postlikesmodaltoggleopen.addEventListener('click', function (e) {
    //if (postlikesdataretrieved == false) {
        //postlikesdataretrieved = true;
        var req = new XMLHttpRequest();
        const url = window.location.href;
        const indexStart = url.lastIndexOf("/") + 1;
        const id = url.substring(indexStart)
        const urlconfirmed = `/liks/details2/${id}`;
        req.open("GET", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                // loop over array and insert data into hidden modal and display modal when done
                for (var i = 0; i < data["ds"].length; i++) {
                    // pull needed values from selected fields (id, name, imageurl)
                    var id = data["ds"][i]["ID"];
                    var username = data["ds"][i]["USERNAME"];
                    var imageurl = data["ds"][i]["IMAGEURL"];
                    var div = document.createElement("div");
                    div.classList.add("media");
                    div.classList.add("mb-15");
                    var link = document.createElement("a");
                    link.setAttribute("href", `/posts/details/${id}`);
                    link.classList.add("mr-3")
                    var img = document.createElement("img");
                    img.setAttribute("src", imageurl);
                    img.classList.add("avatarSmall");
                    link.append(img);
                    div.append(link);
                    var div2 = document.createElement("div");
                    var link2 = document.createElement("a");
                    link2.setAttribute("href", `/posts/details/${id}`);
                    var h5 = document.createElement("h5");
                    h5.innerText = username;
                    link2.append(h5);
                    div2.appendChild(link2);
                    div.appendChild(div2);
                    postlikesmodalbody.appendChild(div);
                }
            }
        }
        req.send();
    //}
    postlikesmodal.classList.add("Shown");
    // send ajax request to get data and place returned data into modal then open modal
    // select * from users where id in (select following from topicfollowing where followed = topicid)
});

postlikesmodaltoggleclose.addEventListener('click', function (e) {
    postlikesmodalbody.innerHTML = "";
    postlikesmodal.classList.remove("Shown");
    // close modal which already contains data from ajax request
});

