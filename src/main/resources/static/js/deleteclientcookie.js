var delete_cookie = function (name) {
    document.cookie = name + '=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

delete_cookie("sid");
// remove cookie and change url to /