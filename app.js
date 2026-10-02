// Auto-detect API base: localhost uses the local backend;
// any other host (GitHub Pages, Vercel, etc.) reads from window.API_BASE
// set in index.html, or falls back to the production URL.
let API_BASE;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    API_BASE = "http://localhost:5000/api";
} else if (window.API_BASE) {
    API_BASE = window.API_BASE;
} else {
    // TODO: replace with your deployed backend URL, e.g.
    // API_BASE = "https://your-calculator-backend.onrender.com/api";
    API_BASE = "http://localhost:5000/api";
}

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const historyList = document.getElementById("historyList");

let currentExpression = "";

function updateDisplay() {
    expressionEl.innerHTML = currentExpression || "&nbsp;";
}

function appendValue(value) {
    currentExpression += value;
    updateDisplay();
}

function clearAll() {
    currentExpression = "";
    resultEl.textContent = "0";
    resultEl.classList.remove("error-msg");
    updateDisplay();
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
}

async function calculate() {
    if (!currentExpression.trim()) {
        return;
    }
    try {
        const response = await fetch(`${API_BASE}/calculate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression: currentExpression }),
        });
        const data = await response.json();
        if (data.success) {
            resultEl.textContent = data.result;
            resultEl.classList.remove("error-msg");
            currentExpression = String(data.result);
            updateDisplay();
        } else {
            resultEl.textContent = data.message || "Error";
            resultEl.classList.add("error-msg");
        }
    } catch (err) {
        resultEl.textContent = "Server unavailable";
        resultEl.classList.add("error-msg");
    }
    loadHistory();
}

async function loadHistory() {
    try {
        const response = await fetch(`${API_BASE}/history`);
        const data = await response.json();
        if (data.success) {
            renderHistory(data.records);
        }
    } catch (err) {
        historyList.innerHTML = '<li class="history-empty">Failed to load history</li>';
    }
}

function renderHistory(records) {
    if (!records || records.length === 0) {
        historyList.innerHTML = '<li class="history-empty">No records yet</li>';
        return;
    }
    historyList.innerHTML = "";
    records.forEach((record) => {
        const li = document.createElement("li");
        li.className = "history-item";

        const info = document.createElement("div");
        info.className = "history-info";

        const expr = document.createElement("div");
        expr.className = "history-expr";
        expr.textContent = record.expression;

        const res = document.createElement("div");
        res.className = "history-res";
        res.textContent = "= " + record.result;

        const time = document.createElement("div");
        time.className = "history-time";
        time.textContent = record.created_at;

        info.appendChild(expr);
        info.appendChild(res);
        info.appendChild(time);

        const delBtn = document.createElement("button");
        delBtn.className = "btn-delete";
        delBtn.innerHTML = "&times;";
        delBtn.title = "Delete record";
        delBtn.addEventListener("click", () => deleteRecord(record.id));

        li.appendChild(info);
        li.appendChild(delBtn);
        historyList.appendChild(li);
    });
}

async function deleteRecord(id) {
    try {
        await fetch(`${API_BASE}/history/${id}`, { method: "DELETE" });
        loadHistory();
    } catch (err) {
        alert("Failed to delete record");
    }
}

async function clearAllHistory() {
    if (!confirm("Delete all history records?")) {
        return;
    }
    try {
        await fetch(`${API_BASE}/history`, { method: "DELETE" });
        loadHistory();
    } catch (err) {
        alert("Failed to clear history");
    }
}

document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", () => {
        const value = key.dataset.value;
        const action = key.dataset.action;
        if (action === "clear") {
            clearAll();
        } else if (action === "backspace") {
            backspace();
        } else if (action === "equals") {
            calculate();
        } else if (value) {
            appendValue(value);
        }
    });
});

document.getElementById("clearAllBtn").addEventListener("click", clearAllHistory);

document.addEventListener("keydown", (e) => {
    if (/^[0-9+\-*/().]$/.test(e.key)) {
        appendValue(e.key);
    } else if (e.key === "Enter") {
        e.preventDefault();
        calculate();
    } else if (e.key === "Backspace") {
        backspace();
    } else if (e.key === "Escape") {
        clearAll();
    }
});

loadHistory();
