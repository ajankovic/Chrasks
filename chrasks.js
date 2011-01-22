/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: Main javascript file for Google Chrome plugin Chrasks. It uses 
             localStorage technology for saving tasks data.
*/

function Chrasks(){
	var me = this;
	this.taskForm = document.getElementById('task-form');
	this.taskList = document.getElementById('task-list');
	this.taskText = document.getElementById('task-text');
	this.createBtn = document.getElementById('create-button');
	this.tasks = [];
	
	this.createBtn.onclick = function(){ 
		me.createTask(); 
		me.loadTasks();
	};
};

Chrasks.prototype.loadTasks = function(){
	var me = this;
	var parsedTasks = JSON.parse(localStorage.getItem("chrasks.tasks"));
	if(parsedTasks !== null){
		this.tasks = parsedTasks;
	}
	this.taskList.innerHTML = '';
	if(!this.tasks || this.tasks.length == 0){
		this.taskList.innerHTML = '<li>No tasks</li>';
	}else{
		for(var i=0;i<this.tasks.length;i++){
			var li = document.createElement('li');
			li.innerHTML = this.tasks[i];
			li.onclick = function(){
				var j = i;
				return function(){
					me.removeTask(j);
					me.loadTasks();
				}
			}();
			this.taskList.appendChild(li);
		}
	}
}

Chrasks.prototype.saveTask = function(task){
	this.tasks[this.tasks.length] = task;
	localStorage.setItem('chrasks.tasks', JSON.stringify(this.tasks));
}

Chrasks.prototype.removeTask = function(i){
	var from = i;
	var to;
	var rest = this.tasks.slice((to || from) + 1 || this.tasks.length);
  this.tasks.length = from < 0 ? this.tasks.length + from : from;
  this.tasks.push.apply(this.tasks, rest);
  localStorage.setItem('chrasks.tasks', JSON.stringify(this.tasks));
}

Chrasks.prototype.createTask = function(){
	if (this.taskText.value !== '') {
		this.saveTask(this.taskText.value);
		this.taskText.value = '';
	}else{
		alert('First enter some value for a task');	
	};
}

window.onload = function(){
	window.chrasks = new Chrasks();
	chrasks.loadTasks();
}
