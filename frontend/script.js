// Base URL for the API endpoints (adjust as needed)
const apiBaseUrl = 'http://localhost:3000/api';

// DOM Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const diarySection = document.getElementById('diary-section');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

const logoutBtn = document.getElementById('logout-btn');
const newEntryForm = document.getElementById('new-entry-form');
const entriesContainer = document.getElementById('entries');

// Retrieve the JWT token from localStorage, if available
let jwtToken = localStorage.getItem('jwtToken');

// If token exists, show diary section
if (jwtToken) {
  showDiary();
}

// Toggle to show the registration form
showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  showRegister();
});

// Toggle to show the login form
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});

// Handle Login Form Submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "username": username, 
        "password": password 
      })
    });
    if (!response.ok) {
      throw new Error('Invalid credentials.');
    }
    const data = await response.json();
    jwtToken = data.token; // expecting { token: '...' }
    localStorage.setItem('jwtToken', jwtToken);
    showDiary();
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});

// Handle Registration Form Submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const email = document.getElementById('reg-email').value;

  try {
    const response = await fetch(`${apiBaseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "username": username, 
        "password": password, 
        "email": email 
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "Registration failed"
      if (errorData.message) {
        errorMessage += `\n${errorData.message}`
      }
      if (errorData.errors) {
        errorMessage += errorData.errors.map(error => `\n${error.field} - ${error.message}`);
      }
      throw new Error(errorMessage);
    }
    alert('Registration successful! Please log in.');
    showLogin();
  } catch (error) {
    alert('Error during registration: ' + error.message);
  }
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('jwtToken');
  jwtToken = null;
  showLogin();
});

// Handle New Diary Entry Submission
newEntryForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from the new entry form
  const dateInput = document.getElementById('new-entry-date').value;
  const entry_date = new Date(dateInput).toISOString().split('T')[0];
  const mood = document.getElementById('new-entry-mood').value;
  const weight = document.getElementById('new-entry-weight').value;
  const sleep_hours = document.getElementById('new-entry-sleep-hours').value;
  const notes = document.getElementById('new-entry-notes').value;

  try {
    const response = await fetch(`${apiBaseUrl}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({ 
        "entry_date": entry_date,
        "mood": mood,
        "weight": weight,
        "sleep_hours": sleep_hours,
        "notes": notes
       })
    });
    if (!response.ok) {
      throw new Error('Failed to add entry.');
    }
    // Clear the new entry form and fetch entries again
    document.getElementById('new-entry-date').value = '';
    document.getElementById('new-entry-mood').value = '';
    document.getElementById('new-entry-weight').value = '';
    document.getElementById('new-entry-sleep-hours').value = '';
    document.getElementById('new-entry-notes').value = '';
    fetchEntries();
  } catch (error) {
    alert('Error adding entry: ' + error.message);
  }
});

// Fetch Diary Entries from the API
async function fetchEntries() {
  try {
    const response = await fetch(`${apiBaseUrl}/entries`, {
      headers: { 'Authorization': 'Bearer ' + jwtToken }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch entries.');
    }
    const entries = await response.json();
    entriesCache = entries; // Save a copy for sorting
    renderEntries(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
}

// Listen for changes on the sort options and re-render entries when changed
document.getElementById('sort-field').addEventListener('change', () => renderEntries(entriesCache));
document.getElementById('sort-order').addEventListener('change', () => renderEntries(entriesCache));

// Render Diary Entries in the DOM based on selected sort options
function renderEntries(entries) {
  console.log('Rendering entries:', entries);
  const sortField = document.getElementById('sort-field').value;
  const sortOrder = document.getElementById('sort-order').value;
  
  // Create a copy and sort the entries
  const sortedEntries = [...entries].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // For date fields, convert to Date objects
    if (sortField === 'entry_date' || sortField === 'created_at') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Render the sorted entries
  entriesContainer.innerHTML = '';
  if (sortedEntries.length === 0) {
    entriesContainer.innerHTML = '<p>No diary entries yet.</p>';
    return;
  }
  sortedEntries.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';
    entryDiv.innerHTML = `
      <div class="entry-header">
        <h3>Entry for ${new Date(entry.entry_date).toLocaleDateString('fi-FI')}</h3>
      </div>
      <div class="entry-details">
        <p><strong>Mood:</strong> ${entry.mood}</p>
        <p><strong>Weight:</strong> ${entry.weight} kg</p>
        <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
        <p><strong>Notes:</strong> ${entry.notes}</p>
        <small>Created: ${new Date(entry.created_at).toLocaleDateString('fi-FI')} ${new Date(entry.created_at).toLocaleTimeString('en-GB')}</small>
        <br>
        <br>
        <button data-id="${entry.entry_id}" class="delete-btn">Delete</button>
      </div>
      <br>
    `;
    entriesContainer.appendChild(entryDiv);
  });

  // Attach delete event handlers for each delete button
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const entryId = e.target.getAttribute('data-id');
      try {
        const response = await fetch(`${apiBaseUrl}/entries/${entryId}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + jwtToken }
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to delete entry.');
        }
        fetchEntries(); // Refresh the entry list
      } catch (error) {
        alert('Error deleting entry: ' + error.message);
      }
    });
  });
}

// Toggle functions to show/hide sections
function showLogin() {
  loginSection.style.display = 'block';
  registerSection.style.display = 'none';
  diarySection.style.display = 'none';
}

function showRegister() {
  loginSection.style.display = 'none';
  registerSection.style.display = 'block';
  diarySection.style.display = 'none';
}

function showDiary() {
  loginSection.style.display = 'none';
  registerSection.style.display = 'none';
  diarySection.style.display = 'block';
  fetchEntries();
}
