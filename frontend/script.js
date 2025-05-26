const apiUrl = 'http://localhost:8080/api/tasks';

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    dueDate: document.getElementById('dueDate').value,
    status: document.getElementById('status').value,
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  });

  if (res.ok) {
    taskForm.reset();
    loadTasks();
  }
});

async function loadTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();

  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${task.title}</strong> (${task.status})<br>
      Due: ${new Date(task.dueDate).toLocaleString()}<br>
      ${task.description || ''}
      <br>
      <select onchange="updateStatus(${task.id}, this.value)">
        <option value="NEW" ${task.status === 'NEW' ? 'selected' : ''}>NEW</option>
        <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>IN PROGRESS</option>
        <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
      </select>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

async function updateStatus(id, newStatus) {
  await fetch(`${apiUrl}/${id}/status?status=${newStatus}`, {
    method: 'PUT'
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  loadTasks();
}

loadTasks();
