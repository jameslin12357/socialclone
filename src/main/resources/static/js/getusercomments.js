const usercommentsmodaltoggleopen = document.getElementById("usercommentsmodaltoggleopen");
const usercommentsmodal = document.getElementById("usercommentsmodal");
const usercommentsmodaltoggleclose = document.getElementById("usercommentsmodaltoggleclose");
const usercommentsmodalbody = document.getElementById("usercommentsmodalbody");

//var usercommentsdataretrieved = false;
usercommentsmodaltoggleopen.addEventListener('click', function (e) {
    //if (usercommentsdataretrieved == false) {
        //usercommentsdataretrieved = true;
        var req = new XMLHttpRequest();
        const url = window.location.href;
        const indexStart = url.lastIndexOf("/") + 1;
        const id = url.substring(indexStart)
        const urlconfirmed = `/comments/details2/${id}`;
        req.open("GET", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                // loop over array and insert data into hidden modal and display modal when done
                for (var i = 0; i < data["ds"].length; i++) {
                    // pull needed values from selected fields (id, name, imageurl)
                    var id = data["ds"][i]["ID"];
                    var description = data["ds"][i]["DESCRIPTION"];
                    var div = document.createElement("div");
                    div.classList.add("media");
                    div.classList.add("mb-15");
                    var link = document.createElement("a");
                    link.setAttribute("href", `/comments/details/${id}`);
                    link.classList.add("mr-3")
                    var span = document.createElement("span");
                    span.innerText = id;
                    link.append(span);
                    div.append(link);
                    var div2 = document.createElement("div");
                    var h5 = document.createElement("h5");
                    h5.innerText = description;
                    div2.appendChild(h5);
                    div.appendChild(div2);
                    usercommentsmodalbody.appendChild(div);
                }
            }
        }
        req.send();
    //}
    usercommentsmodal.classList.add("Shown");
    // send ajax request to get data and place returned data into modal then open modal
    // select * from users where id in (select following from topicfollowing where followed = topicid)
});

usercommentsmodaltoggleclose.addEventListener('click', function (e) {
    usercommentsmodalbody.innerHTML = "";
    usercommentsmodal.classList.remove("Shown");
    // close modal which already contains data from ajax request
});

