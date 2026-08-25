let tasks =
    JSON.parse(
        localStorage.getItem("myTasks")
    ) || [];

let selectedDate = new Date();

let selectedPriority = "medium";


const datePicker =
    document.getElementById("datePicker");

const dateText =
    document.getElementById("dateText");

const weekday =
    document.getElementById("weekday");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const taskCounter =
    document.getElementById("taskCounter");

const modal =
    document.getElementById("modal");


/* DATE */

function dateToString(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function stringToDate(value) {

    const parts =
        value.split("-");

    return new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
    );
}


function updateDate() {

    datePicker.value =
        dateToString(selectedDate);

    dateText.textContent =
        selectedDate.toLocaleDateString(
            "ru-RU",
            {
                day: "numeric",
                month: "long"
            }
        );

    weekday.textContent =
        selectedDate.toLocaleDateString(
            "ru-RU",
            {
                weekday: "long"
            }
        );

    renderTasks();
}


/* TASKS */

function renderTasks() {

    const date =
        dateToString(selectedDate);

    const todayTasks =
        tasks.filter(
            task => task.date === date
        );

    taskList.innerHTML = "";

    taskCounter.textContent =
        todayTasks.length;


    if (todayTasks.length === 0) {

        emptyState.style.display =
            "block";

        return;
    }

    emptyState.style.display =
        "none";


    todayTasks.forEach(task => {

        const element =
            document.createElement("div");

        element.className =
            "task" +
            (task.completed
                ? " completed"
                : "");


        const priorityClass =
            `priority-${task.priority}`;


        element.innerHTML = `

            <button
                class="checkbox ${
                    task.completed
                        ? "completed"
                        : ""
                }"
                onclick="toggleTask('${task.id}')"
            >
                ${
                    task.completed
                        ? "✓"
                        : ""
                }
            </button>


            <div class="task-info">

                <div class="task-title">
                    ${escapeHtml(task.title)}
                </div>

                <div class="task-meta">

                    <span>
                        ${escapeHtml(task.category)}
                    </span>

                    <span>
                        <span
                            class="priority-dot
                            ${priorityClass}">
                        </span>

                        ${priorityName(
                            task.priority
                        )}
                    </span>

                </div>

            </div>


            <button
                class="delete-button"
                onclick="deleteTask('${task.id}')"
            >
                ×
            </button>

        `;


        taskList.appendChild(element);

    });
}


function priorityName(priority) {

    if (priority === "high")
        return "Высокий";

    if (priority === "low")
        return "Низкий";

    return "Средний";
}


function toggleTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );

    if (!task) return;

    task.completed =
        !task.completed;

    save();

    renderTasks();
}


function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );

    save();

    renderTasks();
}


function save() {

    localStorage.setItem(
        "myTasks",
        JSON.stringify(tasks)
    );
}


/* ADD TASK */

document
    .getElementById("addButton")
    .onclick = function() {

        document.getElementById(
            "taskDate"
        ).value =
            dateToString(selectedDate);

        modal.classList.remove(
            "hidden"
        );
    };


document
    .getElementById("closeModal")
    .onclick = function() {

        modal.classList.add(
            "hidden"
        );
    };


document
    .getElementById("saveTask")
    .onclick = function() {

        const title =
            document.getElementById(
                "taskTitle"
            ).value.trim();

        const date =
            document.getElementById(
                "taskDate"
            ).value;

        const category =
            document.getElementById(
                "taskCategory"
            ).value;


        if (!title) {

            alert(
                "Введите название задачи"
            );

            return;
        }


        tasks.push({

            id:
                Date.now().toString(),

            title,

            date,

            category,

            priority:
                selectedPriority,

            completed:
                false
        });


        save();

        document.getElementById(
            "taskTitle"
        ).value = "";

        modal.classList.add(
            "hidden"
        );

        selectedDate =
            stringToDate(date);

        updateDate();
    };


/* PRIORITY */

document
    .querySelectorAll(".priority")
    .forEach(button => {

        button.onclick = function() {

            document
                .querySelectorAll(
                    ".priority"
                )
                .forEach(
                    b =>
                        b.classList.remove(
                            "active"
                        )
                );

            this.classList.add(
                "active"
            );

            selectedPriority =
                this.dataset.priority;
        };

    });


/* DATE NAVIGATION */

document
    .getElementById("previousDay")
    .onclick = function() {

        selectedDate.setDate(
            selectedDate.getDate() - 1
        );

        updateDate();
    };


document
    .getElementById("nextDay")
    .onclick = function() {

        selectedDate.setDate(
            selectedDate.getDate() + 1
        );

        updateDate();
    };


datePicker.onchange =
    function() {

        selectedDate =
            stringToDate(
                this.value
            );

        updateDate();
    };


/* DARK MODE */

document
    .getElementById("themeButton")
    .onclick = function() {

        document.body.classList.toggle(
            "dark"
        );

        const dark =
            document.body.classList.contains(
                "dark"
            );

        localStorage.setItem(
            "darkMode",
            dark
        );

        this.textContent =
            dark ? "☀️" : "🌙";
    };


if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

    document.getElementById(
        "themeButton"
    ).textContent = "☀️";
}


/* SECURITY */

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


updateDate();
// Firebase Cloud Messaging
const firebaseConfig = {
  apiKey: "AIzaSyBKimXXoC99w_2b5rWLFPcsiKL5pm8fYhE",
  authDomain: "my-tasks-e4349.firebaseapp.com",
  projectId: "my-tasks-e4349",
  storageBucket: "my-tasks-e4349.firebasestorage.app",
  messagingSenderId: "798642364644",
  appId: "1:798642364644:web:a4a55c4a2e53289bbb4cf1"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

async function enableNotifications() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Разрешение на уведомления не получено.");
      return;
    }

    const token = await messaging.getToken({
      vapidKey: "BH67j4E2t0PG3dNYovMPwaNOJCNI2Qft4l5C-2k-Repdw46s6KW2ErOY9zJz7_FZiStNLSvNGXRixWgJqmYy9W0"
    });

    console.log("Токен уведомлений:", token);

  } catch (error) {
    console.error("Ошибка уведомлений:", error);
  }
const notificationButton = document.getElementById("notificationButton");

if (notificationButton) {
    notificationButton.addEventListener("click", enableNotifications);
}
