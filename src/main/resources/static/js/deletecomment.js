const deletecommentmodaltoggleopen = document.getElementById("deletecommentmodaltoggleopen");
const deletecommentmodal = document.getElementById("deletecommentmodal");
const deletecommentmodaltoggleclose = document.getElementById("deletecommentmodaltoggleclose");
const deletecommentbutton = document.getElementById("deletecommentbutton");
const deletecommentform = document.getElementById("deletecommentform");

deletecommentmodaltoggleopen.addEventListener('click', function (e) {
    deletecommentmodal.classList.add("Shown");
});

deletecommentmodaltoggleclose.addEventListener('click', function (e) {
    deletecommentmodal.classList.remove("Shown");
});

deletecommentbutton.addEventListener('click', function (e) {
    deletecommentform.submit();
})