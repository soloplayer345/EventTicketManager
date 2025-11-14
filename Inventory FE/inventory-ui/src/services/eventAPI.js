const API_URL = "https://localhost:7269/api/events";
const token = localStorage.getItem("token");

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// Event operations
export async function getEvents() {
    const res = await fetch(API_URL, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getEventById(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createEvent(event) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(event)
    });
    return res.json();
}

export async function updateEvent(id, event) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(event)
    });
    return res.json();
}

export async function deleteEvent(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
}

// TicketType operations
export async function getTicketTypesByEventId(eventId) {
    const res = await fetch(`${API_URL}/${eventId}/ticket-types`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createTicketType(ticketType) {
    const res = await fetch(`${API_URL}/${ticketType.eventId}/ticket-types`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(ticketType)
    });
    return res.json();
}

export async function updateTicketType(id, ticketType) {
    const res = await fetch(`${API_URL}/ticket-types/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(ticketType)
    });
    return res.json();
}

export async function deleteTicketType(id) {
    await fetch(`${API_URL}/ticket-types/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
}

