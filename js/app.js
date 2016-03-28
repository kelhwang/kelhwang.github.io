//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivty so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//new task list item
var createNewTaskElement = function(taskString) {
  //create list item
  var listItem = document.createElement("li");  
  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbox
  
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.delete
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
  //each of these elements need modified and 
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  // each element need to be appended
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
  
}

//add a new task
var addTask = function (){
  console.log("add task....");
  
  //when button pressed
  //create a new list item with the text from #new-task
  var listItem = createNewTaskElement(taskInput.value);
  //append list item to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
}

//edit an existing task
var editTask = function() {
  console.log("edit task");
  
  var listItem = this.parentNode;
  listItem.querySelector("button.edit").innerText = "Save";
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
  //if class of parent is .EditMode, 
  if(containsClass) {
    
    //switch from editmode
    //label text becomes the inputs value
    label.innerText = editInput.value;
    listItem.querySelector("button.edit").innerText = "Edit";
  } else {
    //else
    //switch to editmode
    //input value becomes the label's text
    editInput.value = label.innerText;

  }
  //toggle editmode on the list item
  listItem.classList.toggle("editMode");
}

//delete an existing task
var deleteTask = function() {
  console.log("delete task");
//when delete button is pressed
  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //remove the parent list item from the ul
  ul.removeChild(listItem);
}

//mark a task as complete
var taskCompleted = function(){
  console.log("task complete");
//when the checkbox is checked
  //apend the task to #completed-tasks li
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//mark a task as incomplete
var taskIncomplete = function() {
  console.log("task incomplete");
  //when the checkbox is unchecked
  //append the task to #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
  console.log("bind list items..");
  //select it's children
  var checkBox = taskListItem.querySelector("input[type='checkbox']");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
  editButton.onclick = editTask;
    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkboxEventHandler;
}


//set click handler to addtask function

addButton.addEventListener("click", addTask);


//cycle over incompletetasksholder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
  //for each list item
     //bind events to list item's children (taskcompleted)
  bindTaskEvents(incompleteTasksHolder.children[i],taskCompleted);
}

//cycle over completedtasksholder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++){
  //for each list item
     //bind events to list item's children (taskcompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
