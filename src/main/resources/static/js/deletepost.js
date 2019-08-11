const deletepostmodaltoggleopen = document.getElementById("deletepostmodaltoggleopen");
const deletepostmodal = document.getElementById("deletepostmodal");
const deletepostmodaltoggleclose = document.getElementById("deletepostmodaltoggleclose");
const deletepostbutton = document.getElementById("deletepostbutton");
const deletepostform = document.getElementById("deletepostform");

deletepostmodaltoggleopen.addEventListener('click', function (e) {
    deletepostmodal.classList.add("Shown");
});

deletepostmodaltoggleclose.addEventListener('click', function (e) {
    deletepostmodal.classList.remove("Shown");
});

deletepostbutton.addEventListener('click', function (e) {
    deletepostform.submit();
})