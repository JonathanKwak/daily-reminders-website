function checkboxClicked() {
    //$(this).siblings(".secondary-text").toggleClass("strikethrough");
    $(this).toggleClass("completed-checkbox");
    const parentList = $(this).closest("li")

    const total = parentList.find(".checkbox").length;
    const checked = parentList.find(".completed-checkbox").length;
    const label = parentList.find(".secondary-text")

    const original_text = label.attr("original-text")

    label.text(`${original_text} (${checked}/${total})`);

    if ($(this).hasClass("completed-checkbox")) {
        $(this).text("X")
    } else {
        $(this).text("O")
    }

    if (total == checked) {
        label.addClass("strikethrough")
    } else {
        label.removeClass("strikethrough")
    };
};

function updateTimer() {
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
};

// this is for today's tasks
// gotta get the data from localStorage or something
function createTodaysTask(name, count) {
    // clone template
    let $clone = $($("#cell-template").html()); // works if html is complete <li>...</li>

    for (let i = 0; i < count; i++) {
        let $taskClone = $("#task-template").clone(true, true)
            .removeAttr("id")
            .show();
        $clone.prepend($taskClone);
    }

    $clone.find(".secondary-text")
        .attr("original-text", name)
        .attr("task-count", count)
        .text(`${name} (0/${count})`);

    $("#task-list").append($clone);
};

function deleteTask() {
    const parentTask = $(this).closest(".created-task")
    parentTask.remove()
}

// create a singular task
// more data will be provided later in development
function addTask(name) {
    // created-task-template
    let $clone = $($("#created-task-template").html());

    $clone.find(".delete-button").click(deleteTask)

    $("#created-task-list").append($clone)
}

function onDocumentReady() {
    updateTimer();

    createTodaysTask("Do laundry", 3);
    createTodaysTask("Make the world a better place", 1);
    createTodaysTask("Another activity which we must do", 2);

    $("#add-button").click(addTask)
    $(".checkbox").click(checkboxClicked);
}

$(document).ready(onDocumentReady)