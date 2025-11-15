const API_URL = "https://localhost:7269/api/orders";
const token = localStorage.getItem("token");

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// Order operations
export async function getOrders() {
    const res = await fetch(API_URL, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getOrderById(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getOrdersByAccountId(accountId) {
    const res = await fetch(`${API_URL}/account/${accountId}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createOrder(order) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(order)
    });
    return res.json();
}

export async function updateOrderStatus(id, status) {
    // Status: 0 = Pending, 1 = Paid, 2 = Cancelled
    const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status })
    });
    return res.json();
}

// OrderDetail operations
export async function getOrderDetailsByOrderId(orderId) {
    const res = await fetch(`${API_URL}/${orderId}/order-details`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createOrderDetail(orderDetail) {
    const res = await fetch(`${API_URL}/${orderDetail.orderId}/order-details`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(orderDetail)
    });
    return res.json();
}

// Ticket operations
export async function getTicketsByOrderDetailId(orderDetailId) {
    const res = await fetch(`${API_URL}/order-details/${orderDetailId}/tickets`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getTicketsByAccountId(accountId) {
    const res = await fetch(`${API_URL}/account/${accountId}/tickets`, {
        headers: getHeaders(),
    });
    return res.json();
}

