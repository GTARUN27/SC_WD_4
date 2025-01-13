// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskTitleInput = document.getElementById("task-title");
    const taskDateTimeInput = document.getElementById("task-datetime");
    const addTaskBtn = document.getElementById("add-task-btn");
    const pendingList = document.getElementById("pending-list");
    const completedList = document.getElementById("completed-list");

    function createTaskItem(title, datetime) {
        const li = document.createElement("li");
        const taskInfo = document.createElement("div");
        taskInfo.innerHTML = `<strong>${title}</strong><br><small>${new Date(datetime).toLocaleString()}</small>`;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener("click", () => {
            li.classList.add("completed");
            completedList.appendChild(li);
            completeBtn.remove();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            const newTitle = prompt("Edit task title:", title);
            const newDatetime = prompt("Edit date and time (YYYY-MM-DDTHH:MM):", datetime);
            if (newTitle) taskInfo.innerHTML = `<strong>${newTitle}</strong><br><small>${new Date(newDatetime || datetime).toLocaleString()}</small>`;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => li.remove());

        li.appendChild(taskInfo);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        return li;
    }

    addTaskBtn.addEventListener("click", () => {
        const title = taskTitleInput.value.trim();
        const datetime = taskDateTimeInput.value;

        if (title && datetime) {
            const taskItem = createTaskItem(title, datetime);
            pendingList.appendChild(taskItem);
            taskTitleInput.value = "";
            taskDateTimeInput.value = "";
        } else {
            alert("Please enter a task title and set a date/time.");
        }
    });

    // Add event listener for sorting tasks
    document.getElementById("sort-tasks-btn").addEventListener("click", () => {
        const tasks = Array.from(pendingList.children);
        tasks.sort((a, b) => {
            const dateA = new Date(a.querySelector("small").textContent);
            const dateB = new Date(b.querySelector("small").textContent);
            return dateA - dateB;
        });
        tasks.forEach(task => pendingList.appendChild(task));
    });

    // Add search functionality
    const searchInput = document.getElementById("search-tasks");
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
        const tasks = pendingList.querySelectorAll("li");
        tasks.forEach(task => {
            const taskTitle = task.querySelector("strong").textContent.toLowerCase();
            if (taskTitle.includes(searchValue)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
    });

    // Add clear completed tasks functionality
    document.getElementById("clear-completed-btn").addEventListener("click", () => {
        completedList.innerHTML = "";
    });

    // Add animation to tasks
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                mutation.addedNodes[0].classList.add("fade-in");
            }
        });
    });

    observer.observe(pendingList, { childList: true });
    observer.observe(completedList, { childList: true });
});
