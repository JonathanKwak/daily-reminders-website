// const tasks = [
//     {title: "Do laundry", count: 3},
//     {title: "Misc. tasks", count: 1}
// ]

const tasks = new Map();

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

function updateTasks() {
    $(".added-task").remove();
    const storageTasks = []; // for localStorage use, JSON stringify later

    for (const data of tasks.values()) {
        createTodaysTask(data.title, data.count);
        storageTasks.push(data);
    };

    console.log("updating tasks, JSONing and all")
    localStorage.setItem("tasks", JSON.stringify(storageTasks));
    console.log(JSON.parse(localStorage.getItem("tasks")));
};

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

    $clone.addClass("added-task");

    $("#task-list").append($clone);
};

function deleteTask() {
    const parentTask = $(this).closest(".created-task")
    parentTask.remove()
    
    const taskList = $("#created-task-list");
    const total = taskList.find(".created-task").length;

    if (total === 0) {
        $("#empty-message").show();
    } else {
        $("#empty-message").hide();
    }
}

// create a singular task
// more data will be provided later in development
function addTask() {
    // created-task-template
    let $clone = $($("#created-task-template").html());
    
    $clone.find("#delete-button").click(deleteTask)
    $clone.find("#task-name").on("change", function() {
        // update the tasks list
        
        const data = tasks.get($clone);
        data.title = this.value;

        updateTasks();
    });
    $clone.find("#task-count-adjustment").on("input", function() {
        // update the tasks list

        const data = tasks.get($clone);
        data.count = this.value

        updateTasks();
    });
    $clone.find("#frequency-select").on("input", function() {
        // update something else? todo
    });

    $("#empty-message").hide()

    $("#created-task-list").append($clone)
    
    tasks.set($clone, {
        title: $clone.find("#task-name").val(),
        count: $clone.find("#task-count-adjustment").val(),
    })
    
    updateTasks();
}

function onDocumentReady() {
    updateTimer();
    updateTasks();

    // some really funky JS syntax... the "??" is an OR operator for when the thing is null
    const loadedData = JSON.parse(localStorage.getItem("tasks")) ?? [];
    console.log(loadedData)

    $("#empty-message").show()

    $("#add-button").click(addTask);
    $(".checkbox").click(checkboxClicked);
}

$(document).ready(onDocumentReady)