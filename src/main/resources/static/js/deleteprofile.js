const deleteprofilemodaltoggleopen = document.getElementById("deleteprofilemodaltoggleopen");
const deleteprofilemodal = document.getElementById("deleteprofilemodal");
const deleteprofilemodaltoggleclose = document.getElementById("deleteprofilemodaltoggleclose");
const deleteprofilebutton = document.getElementById("deleteprofilebutton");
const deleteprofileform = document.getElementById("deleteprofileform");

deleteprofilemodaltoggleopen.addEventListener('click', function (e) {
    deleteprofilemodal.classList.add("Shown");
});

deleteprofilemodaltoggleclose.addEventListener('click', function (e) {
    deleteprofilemodal.classList.remove("Shown");
});

deleteprofilebutton.addEventListener('click', function (e) {
    deleteprofileform.submit();
})