$(".checkbox").click(function() {
    //$(this).siblings(".secondary-text").toggleClass("strikethrough");
    $(this).toggleClass("completed-checkbox");
    const parentList = $(this).closest("li")

    const total = parentList.find(".checkbox").length;
    const checked = parentList.find(".completed-checkbox").length;

    const original_text = parentList.find(".secondary-text").attr("original-text")

    parentList.find(".secondary-text").text(`${original_text} (${checked}/${total})`);

    if ($(this).hasClass("completed-checkbox")) {
        $(this).text("X")
    } else {
        $(this).text("O")
    }
});

$(document).ready(function() {
    const date = new Date;
    const days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];

    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    const dayOfWeek = days[date.getDay()]; // .getDay() returns 0-6. 0 = sunday, 6 = saturday
    const month = months[date.getMonth()]; // .getMonth(), same idea as above
    const day = date.getDate() // gets the Day of the Month
    const year = date.getFullYear() // 2025, 2026, etc

    full_str = `${dayOfWeek}, ${month} ${day} ${year}`
    $("#date-title").text(full_str);
});