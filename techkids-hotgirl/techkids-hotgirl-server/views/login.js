$("#loginForm").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
        url: "/login",
        type: "POST",
        data: {
            username: $("#username").val(),
            password: $("#password").val()
        },
        success: function(data) {
            if(data.success) {
                window.location.href = "/loginsuccess";
            }
        },
        error: function(err) {
            if(err && err.responseJSON && err.responseJSON.message) {
                $("#message").text(err.responseJSON.message);
            } else {
                $("#message").text("Something go wrong!");
            }
        }
    });
});