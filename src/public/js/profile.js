$(document).ready(function() {
    $("#submitFacebookProfile").on("click", function(event) {
        event.preventDefault();
        $.ajax({
            url: `${window.location.origin}/set-up-user-fb-profile`,
            method: "POST",
            data: {},
            success: function(data) {
                alert("Setup succeeds");
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            }
        })
    });
});