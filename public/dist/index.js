"use strict";
// IIFE to preserve code scope
(function () {
    var NotificationPlatform;
    (function (NotificationPlatform) {
        NotificationPlatform["SMS"] = "SMS";
        NotificationPlatform["EMAIL"] = "EMAIL";
        NotificationPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlatform || (NotificationPlatform = {}));
    ;
    var UUID = function () {
        return Math.random().toString(32).substr(2, 9);
    };
    var DateUtils = {
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today: function () {
            return new Date();
        },
        formatDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
        }
    };
    ;
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.date = DateUtils.today();
            this.notifications = [NotificationPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        ;
        Reminder.prototype.render = function () {
            return "\n            ---> Reminder <---\n            description: ".concat(this.description, "\n            date: ").concat(DateUtils.formatDate(this.date), "\n            platform: ").concat(this.notifications.join(','), "\n            ");
        };
        ;
        return Reminder;
    }());
    ;
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        ;
        Todo.prototype.render = function () {
            return "\n            ---> TODO <---\n            description: ".concat(this.description, "\n            done: ").concat(this.done, "\n            ");
        };
        ;
        return Todo;
    }());
    ;
    // Mocks
    var todo = new Todo('Todo criado por classe');
    var reminder = new Reminder('Reminder criado por classe', new Date(), [NotificationPlatform.EMAIL]);
    var taskView = {
        render: function (tasks) {
            // Clear view
            var tasksList = document.getElementById("tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            // Render Tasks
            // task.forEach((task) => console.log(JSON.stringify(task)));
            tasks.forEach(function (task) {
                var li = document.createElement("LI");
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    // Controllers
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleTaskCreate = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document
            .getElementById("taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleTaskCreate);
    };
    TaskController(taskView);
})();
