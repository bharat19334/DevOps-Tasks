
const API = "http://127.0.0.1:8000";

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const refreshBtn = document.getElementById("refreshBtn");
const fileInfo = document.getElementById("fileInfo");
const fileList = document.getElementById("fileList");
const message = document.getElementById("message");

function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    fileInfo.textContent = file
        ? `${file.name} (${formatSize(file.size)})`
        : "No file selected";
});

uploadBtn.addEventListener("click", uploadFile);
refreshBtn.addEventListener("click", loadFiles);

async function uploadFile() {
    const file = fileInput.files[0];

    if (!file) {
        message.textContent = "Please select a file first.";
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        uploadBtn.disabled = true;
        message.textContent = "Uploading...";

        const response = await fetch(`${API}/upload`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || "Upload failed");
        }

        message.textContent = "File uploaded successfully!";
        fileInput.value = "";
        fileInfo.textContent = "No file selected";

        await loadFiles();

    } catch (error) {
        message.textContent = error.message;
    } finally {
        uploadBtn.disabled = false;
    }
}

async function loadFiles() {
    try {
        const response = await fetch(`${API}/files`);

        if (!response.ok) {
            throw new Error("Unable to load files");
        }

        const data = await response.json();

        if (!data.files.length) {
            fileList.innerHTML =
                '<div class="empty-state">No files uploaded yet.</div>';
            return;
        }

        fileList.innerHTML = data.files.map(file => `
            <div class="file-row">
                <div>
                    <div class="file-name">📄 ${escapeHTML(file.filename)}</div>
                    <div class="file-size">${formatSize(file.size)}</div>
                </div>

                <div class="file-actions">
                    <button class="download-btn"
                        data-action="download"
                        data-filename="${escapeHTML(file.filename)}">
                        Download
                    </button>

                    <button class="delete-btn"
                        data-action="delete"
                        data-filename="${escapeHTML(file.filename)}">
                        Delete
                    </button>
                </div>
            </div>
        `).join("");

    } catch (error) {
        fileList.innerHTML =
            '<div class="empty-state">Unable to connect to server.</div>';
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

fileList.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const filename = button.dataset.filename;
    const action = button.dataset.action;

    if (action === "download") {
        window.open(
            `${API}/download/${encodeURIComponent(filename)}`,
            "_blank"
        );
    }

    if (action === "delete") {
        if (!confirm("Are you sure you want to delete this file?")) return;

        try {
            const response = await fetch(
                `${API}/files/${encodeURIComponent(filename)}`,
                { method: "DELETE" }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || "Delete failed");
            }

            message.textContent = "File deleted successfully.";
            await loadFiles();

        } catch (error) {
            message.textContent = error.message;
        }
    }
});

loadFiles();
