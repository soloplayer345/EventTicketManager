const API_URL = "https://localhost:7269/api/accounts";
const token = localStorage.getItem("token");

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// Account operations
// AccountRole: 1 = Admin, 2 = Organizer, 3 = Sponsor, 4 = Attendee

export async function getAccounts() {
    const res = await fetch(API_URL, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getAccountById(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getCurrentAccount() {
    const res = await fetch(`${API_URL}/me`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createAccount(account) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(account)
    });
    return res.json();
}

export async function updateAccount(id, account) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(account)
    });
    return res.json();
}

export async function deleteAccount(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
}

export async function getAccountRoleName(role) {
    const roles = {
        1: "Admin",
        2: "Organizer",
        3: "Sponsor",
        4: "Attendee"
    };
    return roles[role] || "Unknown";
}

// Organizer operations
export async function getOrganizers() {
    const res = await fetch(`${API_URL}/organizers`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getOrganizerByAccountId(accountId) {
    const res = await fetch(`${API_URL}/organizers/account/${accountId}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createOrganizer(organizer) {
    const res = await fetch(`${API_URL}/organizers`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(organizer)
    });
    return res.json();
}

