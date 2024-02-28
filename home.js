// PROFILE

function displayUserInfo() {
    // username
    const username = localStorage.getItem("username");
    const usernameEl = document.getElementById("usernameDisplay")
    usernameEl.textContent = username ?? "Unknown";

    // family code
    const familyCode = localStorage.getItem("familyCode");
    const familyCodeEl = document.getElementById("familyCodeDisplay")
    familyCodeEl.textContent = familyCode ?? "Unknown";
}

// Save profile picture to local storage upon upload
function saveProfilePic() {
    document.getElementById('profilePicInput').addEventListener('change', function(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                localStorage.setItem('profilePic', e.target.result);
                displayProfilePic();
            };
            
            reader.readAsDataURL(event.target.files[0]);
        }
    });
}

// Display profile picture from local storage
function displayProfilePic() {
    const profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('profilePic').src = profilePic;
    }
}

// Run when the page loads
displayUserInfo();
displayProfilePic();


// TASK LIST


function initializeTaskLists(userFamily) {
    userFamily.forEach(member => {
        if (!localStorage.getItem(member)) {
            localStorage.setItem(member, JSON.stringify([])); // Initialize with an empty array
        }
        const dropdownEl = document.getElementById('task-list-dropdown');
        dropdownEl.innerHTML += `<option value="${member}">${member}'s To-Do List</option>`;

    });
}

// for now just use example, but after implementing database we will keep track of a user and their family
exampleFamilyLists = ['my_username', 'Sally', 'Bobby']
initializeTaskLists(exampleFamilyLists); 


function retrieveTaskList(taskListName) {
    const selectedList = document.querySelector('.task-list-dropdown').value;
    const tbody = document.getElementById('task-list').querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows
    const tasks = JSON.parse(localStorage.getItem(selectedList)) || [];

    tasks.forEach((task, index) => {
        const newRow = tbody.insertRow();
        
        const taskCell = newRow.insertCell(0);
        taskCell.textContent = task.name;
        
        const dateCell = newRow.insertCell(1);
        dateCell.textContent = task.dueDate;
        
        const addToCalendarCell = newRow.insertCell(2);
        addToCalendarCell.className = 'add-to-calendar';
        addToCalendarCell.innerHTML = '<button>Add to Calendar</button>';
        
        const removeTaskCell = newRow.insertCell(3);
        removeTaskCell.className = 'remove-task';
        removeTaskCell.innerHTML = `<button onclick="removeTask(this, '${selectedList}', ${index})">Remove</button>`;
    });
}

function displayTaskList(taskList) {

}


function removeTask(button) {
    button.closest('tr').remove();
}

function addTask() {
    const taskName = document.getElementById('new-task-name').value;
    const taskDueDate = document.getElementById('new-task-date').value;

    if (!taskName || !taskDueDate) {
        alert('Please fill in all fields.');
        return;
    }

    const tbody = document.getElementById('task-list').querySelector('tbody');
    const newRow = tbody.insertRow(tbody.rows.length - 1);
    
    const taskCell = newRow.insertCell(0);
    taskCell.innerHTML = `${taskName}`;
    
    const dateCell = newRow.insertCell(1);
    dateCell.textContent = taskDueDate;
    
    const addToCalendarCell = newRow.insertCell(2);
    addToCalendarCell.className = 'add-to-calendar';
    addToCalendarCell.innerHTML = '<button>Add to Calendar</button>';
    
    const removeTaskCell = newRow.insertCell(3);
    removeTaskCell.className = 'remove-task';
    removeTaskCell.innerHTML = '<button onclick="removeTask(this)">Remove</button>';
    
    document.getElementById('new-task-name').value = '';
    document.getElementById('new-task-date').value = '';
}



// WEB SOCKET Live Family Event Log
// will log when family members complete a task

// Simulate event messages that will come over WebSocket
setInterval(() => {
    [familyMember, task] = getRandomEvent();
    const eventLog = document.querySelector('#events');
    eventLog.innerHTML +=
        `<div class="event">
            <span class="event-action"> 
                <span class="family-member">${familyMember}</span> completed: 
            </span>
            <span class="task-name">${task}</span>
        </div>` 
  }, 5000);

function getRandomEvent() {
    const familyMembers = ["Eich", "Turing", "Lovelace", "Hopper", "Babbage"];
    const tasks = [
        "clean the kitchen", "take out the trash", 
        "feed the dog", "do the laundry", "wash the car",
        "solve world hunger", "write a compiler",
        "take vitamins", "do 100 pushups", "read a book"
    ];
    const task = this.getRandomElement(tasks);
    const familyMember = this.getRandomElement(familyMembers);
    return [familyMember, task];
    }

function getRandomElement(elements) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
    }