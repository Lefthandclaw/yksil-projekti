const adminApiBaseUrl = 'http://localhost:3000/api';

const adminLoginSection = document.getElementById('admin-login-section');
const adminPanelSection = document.getElementById('admin-panel-section');

const adminLoginForm = document.getElementById('admin-login-form');
const adminLogoutBtn = document.getElementById('admin-logout-btn');

const addUserForm = document.getElementById('add-user-form');
const usersList = document.getElementById('users-list');

let adminJwtToken = localStorage.getItem('adminJwtToken');

if (adminJwtToken) {
  showAdminPanel();
}

adminLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;
  
  try {
    const response = await fetch(`${adminApiBaseUrl}/auth/admin_login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "username": username, 
        "password": password
      })
    });
    if (!response.ok) {
      throw new Error('Invalid admin credentials.');
    }
    const data = await response.json();
    adminJwtToken = data.token; 
    localStorage.setItem('adminJwtToken', adminJwtToken);
    showAdminPanel();
  } catch (error) {
    alert('Admin login failed: ' + error.message);
  }
});

adminLogoutBtn.addEventListener('click', () => {
  localStorage.removeItem('adminJwtToken');
  adminJwtToken = null;
  showAdminLogin();
});

function showAdminLogin() {
  adminLoginSection.style.display = 'block';
  adminPanelSection.style.display = 'none';
}

function showAdminPanel() {
  adminLoginSection.style.display = 'none';
  adminPanelSection.style.display = 'block';
  fetchUsers();
}

addUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('new-user-username').value;
  const email = document.getElementById('new-user-email').value;
  const password = document.getElementById('new-user-password').value;
  
  try {
    const response = await fetch(`${adminApiBaseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminJwtToken
      },
      body: JSON.stringify({ 
        "username": username, 
        "email": email,
        "password": password
      })
    });
    if (!response.ok) {
      throw new Error('Failed to add user.');
    }
    document.getElementById('new-user-username').value = '';
    document.getElementById('new-user-email').value = '';
    document.getElementById('new-user-password').value = '';
    fetchUsers(); 
  } catch (error) {
    alert('Error adding user: ' + error.message);
  }
});

async function fetchUsers() {
  try {
    const response = await fetch(`${adminApiBaseUrl}/users`, {
      headers: { 'Authorization': 'Bearer ' + adminJwtToken }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users.');
    }
    const users = await response.json();
    console.log(users);
    renderUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function renderUsers(users) {
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  `;

  users.forEach(user => {
    if (user.user_level === 'admin') {
      return; 
    }
    tableHTML += `
      <tr>
        <td>${user.user_id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button class="delete-btn" data-id="${user.user_id}">Delete</button>
        </td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;
  usersList.innerHTML = tableHTML;

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const userId = e.target.getAttribute('data-id');
      try {
        const response = await fetch(`${adminApiBaseUrl}/users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + adminJwtToken }
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to delete user.');
        }
        fetchUsers();
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    });
  });
}
