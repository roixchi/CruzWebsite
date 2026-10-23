// Initial Mock Data (used if localStorage is empty)
const defaultUsers = [
    { id: 1, name: "Administrator", email: "admin@example.com", join_date: "2026-01-15" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", join_date: "2026-02-10" },
    { id: 3, name: "John Smith", email: "john@example.com", join_date: "2026-03-05" }
];

// Load users from localStorage or initialize with defaults
function getUsers() {
    const data = localStorage.getItem('users');
    if (!data) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(data);
}

// Save users array to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Add a new user (replacing PHP INSERT statement)
function addUser(name, email) {
    const users = getUsers();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    users.push({ id: newId, name: name, email: email, join_date: today });
    saveUsers(users);
}

// Update existing user record (replacing PHP UPDATE statement)
function updateUser(id, name, email) {
    let users = getUsers();
    users = users.map(user => {
        if (user.id === parseInt(id)) {
            return { ...user, name: name, email: email };
        }
        return user;
    });
    saveUsers(users);
}

// Delete user record (replacing PHP DELETE statement)
function deleteUser(id) {
    let users = getUsers();
    users = users.filter(user => user.id !== parseInt(id));
    saveUsers(users);
}