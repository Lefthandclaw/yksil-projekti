// Base URL for admin API endpoints (adjust as needed)
const adminApiBaseUrl = 'http://localhost:3000/api';

// DOM Elements
const adminLoginSection = document.getElementById('admin-login-section');
const adminPanelSection = document.getElementById('admin-panel-section');

const adminLoginForm = document.getElementById('admin-login-form');
const adminLogoutBtn = document.getElementById('admin-logout-btn');

const addUserForm = document.getElementById('add-user-form');
const usersList = document.getElementById('users-list');

// Retrieve the admin JWT token from localStorage, if available
let adminJwtToken = localStorage.getItem('adminJwtToken');

if (adminJwtToken) {
  showAdminPanel();
}

// Handle Admin Login Form Submission
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
    adminJwtToken = data.token; // expecting { token: '...' }
    localStorage.setItem('adminJwtToken', adminJwtToken);
    showAdminPanel();
  } catch (error) {
    alert('Admin login failed: ' + error.message);
  }
});

// Handle Admin Logout
adminLogoutBtn.addEventListener('click', () => {
  localStorage.removeItem('adminJwtToken');
  adminJwtToken = null;
  showAdminLogin();
});

// Display admin login view
function showAdminLogin() {
  adminLoginSection.style.display = 'block';
  adminPanelSection.style.display = 'none';
}

// Display admin panel view and fetch users
function showAdminPanel() {
  adminLoginSection.style.display = 'none';
  adminPanelSection.style.display = 'block';
  fetchUsers();
}

// Handle Add User Form Submission
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
    // Clear form fields
    document.getElementById('new-user-username').value = '';
    document.getElementById('new-user-email').value = '';
    document.getElementById('new-user-password').value = '';
    fetchUsers(); // Refresh the list of users
  } catch (error) {
    alert('Error adding user: ' + error.message);
  }
});

// Fetch all users from the API
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

// Render users in a table
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
      return; // Skip rendering the admin user
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

  // Attach delete event handlers for each delete button
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
        fetchUsers(); // Refresh the user list
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    });
  });
}
