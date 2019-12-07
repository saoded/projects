var taskInputHtml = '<input type="text" class="form-control taskInput" placeholder="new task">';
var taskListHtml = '<div class="taskList float-left">\
    <input type="text" placeholder="List Title" class="form-control listTitle">\
    <ul class="tasks"></ul>' +
    taskInputHtml +
  '</div>';
// console.log(taskListHtml);

function taskHtml(text) {
  return '<li class="input-group task">\
    <div class="input-group-prepend">\
      <div class="input-group-text">\
        <input type="checkbox" class="taskCheckbox" aria-label="Checkbox for following text input">\
      </div>\
    </div>\
    <input type="text" value="' +
    text +
    '" class="form-control taskName" aria-label="Text input with checkbox">\
    </input>\
    <span class="deleteTask bg-danger">x</span>\
    <!--span class="editTask bg-primary">I</span-->\
  </li>';
}

// console.log($(".tasks"));

$(".addList").on("click", AddList);
$(".taskBoard").on("keyup", ".taskInput", EnterTask);
$(".taskBoard").on("click", ".taskCheckbox", CompleteTask);
$(".taskBoard").on("click", ".deleteTask", DeleteTask);
$(".taskBoard").on("click", ".editTask", EditTask);

function AddList() {
  // $(this).parent().append(taskListHtml);
  $(this).before(taskListHtml);
}

function EnterTask(event) {
  // console.log(event.key);
  if (event.which == 13) {
    $(this).siblings(".tasks").append(taskHtml($(this).val()));
    FinishAddingTask(this);
  }
  else if (event.which == 27) {
    FinishAddingTask(this);
  }
}

function FinishAddingTask(input) {
  $(input).val('');
}

function CompleteTask() {
  $(this).parent().parent().siblings(".taskName").toggleClass("completedTask");
}

function DeleteTask() {
  $(this).parent().fadeOut(500, function () {
    $(this).remove()
  });
}

function EditTask() {
  $(this).parent().fadeOut(500, function () {
    $(this).remove()
  });
}