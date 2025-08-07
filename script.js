$(".checkbox").click(function() {
    console.log("TRUE!!!")
    $(this).siblings(".secondary-text").toggleClass("strikethrough");
    $(this).toggleClass("completed-checkbox");
});