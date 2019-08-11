const postcommentform = document.getElementById("postcommentform");
const postcommentformerror = document.getElementById("postcommentformerror");
const postcommentscount = document.getElementById("postcommentscount");
// user fills out the form, clicks submit and js is run
// form is stopped from being submitted and value
// of textarea is checked to see if it is empty
// if yes display error else send ajax post to 
// add comment to database and when done
// update UI by increment commentscount, insert 
// latest comment into modal, clear error, clear input field, add alert to UI

function postcommentalert() {
    var div = document.createElement("div");
    div.setAttribute("id", "postcommentalert");
    div.classList.add("alert");
    div.classList.add("alert-success");
    div.classList.add("alertFixed");
    div.innerText = "Comment created.";
    document.getElementsByTagName("body")[0].appendChild(div);
}

function deletepostcommentalert() {
    document.getElementById("postcommentalert").remove();
}

postcommentform.addEventListener('submit', function (e) {
    e.preventDefault();
    var description = document.getElementById("postcommentformtextarea").value;
    if (description.length == 0) {
        // toggle textarea is empty error
        postcommentformerror.classList.remove("Hidden");
        postcommentformerror.classList.add("Shown");
    } else {
        // prepare data and send ajax post request
        const userid = datauserid.getAttribute("data-user-id");
        const postid = datarid.getAttribute("data-r-id");
        var postdata = `description=${description}&userid=${userid}&postid=${postid}`;
        var urlconfirmed = "/comments/create";
        var req = new XMLHttpRequest();
        req.open("POST", urlconfirmed);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                console.log(data);
                document.getElementById("postcommentformtextarea").value = "";
                postcommentformerror.classList.add("Hidden");
                postcommentformerror.classList.remove("Shown");
                postcommentscount.innerText = (Number(postcommentscount.innerText) + 1).toString();
                // build an alert message then delete it 5 seconds after it shows up
                postcommentalert();
                setTimeout(deletepostcommentalert, 5000);
            }
        }
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(postdata);
    }
})