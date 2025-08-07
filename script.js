$(".checkbox").click(function() {
    //$(this).siblings(".secondary-text").toggleClass("strikethrough");
    $(this).toggleClass("completed-checkbox");

    if ($(this).hasClass("completed-checkbox")) {
        $(this).text("X")
    } else {
        $(this).text("O")
    }
});