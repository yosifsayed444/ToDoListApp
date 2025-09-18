let InputVal = document.querySelector("input");
let addTask = document.querySelector(".plus");
let emptyTask = document.querySelector(".no-tasks-message");
let containerTask = document.querySelector(".tasks-content");
let counterSpan = document.querySelector(".cnt");
let completedSpan = document.querySelector(".cplt");
let counter = parseInt(document.querySelector(".cnt").textContent);
let completed = parseInt(document.querySelector(".cplt").textContent);
function updateCounters() {
    counterSpan.textContent = counter;
    completedSpan.textContent = completed;
}
window.onload = function () {
    InputVal.focus();
}
addTask.addEventListener("click", function () {
    if (InputVal.value != "") {
        emptyTask.remove();
        let MainSpan = document.createElement("span");
        MainSpan.className = "task-box"
        MainSpan.textContent = InputVal.value;
        let deleted = document.createElement("span");
        deleted.textContent = "delete";
        deleted.className = "delete";
        let finished = document.createElement("span");
        finished.textContent = "Not finished";
        finished.className = "success";
        MainSpan.appendChild(deleted);
        MainSpan.appendChild(finished);
        containerTask.appendChild(MainSpan);
        InputVal.value = "";
        counter++;
        updateCounters();
        deleted.addEventListener("click", function () {
            MainSpan.remove();
            counter--;
            if (completed > 0) {
                completed--; 
            }
            if (counter == 0 && !document.body.contains(emptyTask)) {
                containerTask.appendChild(emptyTask);
            }
            updateCounters();
        })
        finished.addEventListener("click", function () {
            if (MainSpan.classList.contains("finished") === true) {
                MainSpan.classList.remove("finished");
                finished.textContent = "Not finished";
                completed--;
            }
            else if (MainSpan.classList.contains("finished") === false) {
                MainSpan.classList.add("finished");
                finished.textContent = "finished";
                completed++;
            }
            updateCounters();
        })
    }

});


// localStorage ChatGpt

window.addEventListener("load", () => {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        document.querySelector("input").value = ""; // تأكيد
        tasks.split("||").forEach(data => {
            document.querySelector("input").value = data.split("::")[0];
            document.querySelector(".plus").click();
            let latest = document.querySelectorAll(".task-box");
            let lastTask = latest[latest.length - 1];
            if (data.split("::")[1] === "1") {
                lastTask.querySelector(".success").click();
            }
        });
    }
});
const observer = new MutationObserver(() => {
    let data = [];
    document.querySelectorAll(".task-box").forEach(task => {
        let text = task.childNodes[0].textContent;
        let isFinished = task.classList.contains("finished") ? "1" : "0";
        data.push(text + "::" + isFinished);
    });
    localStorage.setItem("tasks", data.join("||"));
});
observer.observe(document.querySelector(".tasks-content"), { childList: true, subtree: true });
setInterval(() => {
    localStorage.setItem("counter", document.querySelector(".cnt").textContent);
    localStorage.setItem("completed", document.querySelector(".cplt").textContent);
}, 500);
window.addEventListener("load", () => {
    let c = localStorage.getItem("counter");
    let f = localStorage.getItem("completed");
    if (c) document.querySelector(".cnt").textContent = c;
    if (f) document.querySelector(".cplt").textContent = f;
});
