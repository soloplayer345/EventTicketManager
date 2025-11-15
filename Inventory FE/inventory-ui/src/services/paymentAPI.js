const API_URL = "https://localhost:7269/api/payments";
const token = localStorage.getItem("token");

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// Payment operations
// PaymentMethod: 0 = Cash, 1 = CreditCard, 2 = BankTransfer, 3 = EWallet

export async function getPayments() {
    const res = await fetch(API_URL, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getPaymentById(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function getPaymentsByOrderId(orderId) {
    const res = await fetch(`${API_URL}/order/${orderId}`, {
        headers: getHeaders(),
    });
    return res.json();
}

export async function createPayment(payment) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payment)
    });
    return res.json();
}

export async function getPaymentMethodName(method) {
    const methods = {
        0: "Cash",
        1: "Credit Card",
        2: "Bank Transfer",
        3: "E-Wallet"
    };
    return methods[method] || "Unknown";
}

