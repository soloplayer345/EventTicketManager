const API_URL = "https://localhost:7269/api/sponsors";
const token = localStorage.getItem("token");

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// Sponsor operations
export async function getSponsors() {
    const res = await fetch(API_URL, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getSponsorById(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createSponsor(sponsor) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(sponsor)
    });
    return res.json();
}

export async function updateSponsor(id, sponsor) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(sponsor)
    });
    return res.json();
}

// SponsorEvent operations (Many-to-Many relationship)
export async function getSponsorEvents() {
    const res = await fetch(`${API_URL}/sponsor-events`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getSponsorEventsByEventId(eventId) {
    const res = await fetch(`${API_URL}/sponsor-events/event/${eventId}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getSponsorEventsBySponsorId(sponsorId) {
    const res = await fetch(`${API_URL}/${sponsorId}/sponsor-events`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createSponsorEvent(sponsorEvent) {
    const res = await fetch(`${API_URL}/sponsor-events`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(sponsorEvent)
    });
    return res.json();
}

// Booth operations
export async function getBoothsBySponsorEventId(sponsorEventId) {
    const res = await fetch(`${API_URL}/sponsor-events/${sponsorEventId}/booths`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createBooth(booth) {
    const res = await fetch(`${API_URL}/booths`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(booth)
    });
    return res.json();
}

export async function getSponsorLevelName(level) {
    // SponsorLevel is an enum value
    const levels = {
        0: "Bronze",
        1: "Silver",
        2: "Gold",
        3: "Platinum"
    };
    return levels[level] || "Unknown";
}

