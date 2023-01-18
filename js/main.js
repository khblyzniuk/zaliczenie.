// render localStorage task list
document.addEventListener("DOMContentLoaded", function(){
    renderListData();
});

//deleting
document.addEventListener('click',function(e){
    if(e.target && e.target.className === 'removeTask'){
        console.log(e.target.className);
        let removeTaskBtn = e.target
        console.log(removeTaskBtn);
        if(removeTaskBtn){
            event.preventDefault();
            let removeIndex = event.target.getAttribute('data-key');
            //console.log(removeIndex);
            let tasksList = JSON.parse(localStorage.getItem('tasks_mgmt'));
            let removeTaskList = tasksList.splice(removeIndex,1);
            console.log(removeIndex, removeTaskList, tasksList);
            localStorage.setItem('tasks_mgmt', JSON.stringify(tasksList));
            renderListData();
        }
    }
});

document.querySelector('form#taskGenerate').addEventListener('submit', function(event){

    event.preventDefault();
    let taskName = document.querySelector('#taskName');
    let taskDescription = document.querySelector('#taskDescription');
    let taskStatus = document.querySelector('#taskDescription');

    letNewTask = { 'taskName' : taskName.value,  'taskDescription' : taskDescription.value };
    console.log(taskName,taskDescription);
    let tasksList;

    if(localStorage.getItem('tasks_mgmt') == null){
        tasksList = [];
    } else {
        tasksList = JSON.parse(localStorage.getItem('tasks_mgmt'));
    }

    tasksList.push(letNewTask);
    localStorage.setItem('tasks_mgmt', JSON.stringify(tasksList));

    taskName.value = '';
    taskDescription.value = '';
    renderListData();
});

function renderListData(){
    const tasks = JSON.parse(localStorage.getItem('tasks_mgmt'));
    console.log(tasks);
    let taskList = '';
    const taskUlEl = document.querySelector('#taskList');
    taskUlEl.innerHTML = '';
    tasks.forEach(function(task, index){
        taskUlEl.innerHTML += '<li data-key="'+ index +'">' +
            '<h2>'+task.taskName+'</h2>  ' +
            '<p>'+ task.taskDescription +'</p>'+
            '<a class="removeTask" href="#" data-key="'+ index +'">Remove</a> ' +
            ' </li>';
    });
}



