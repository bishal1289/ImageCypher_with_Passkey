// 🔐 Enable Encrypt Button Only When Image is Uploaded
const encryptInput = document.getElementById("encryptInput");
const encryptBtn = document.getElementById("encryptBtn");
encryptInput.addEventListener("change", () => {
  encryptBtn.disabled = !encryptInput.files.length;
});

// 🔓 Enable Decrypt Button Only When Both Image and Key Are Uploaded
const decryptInput = document.getElementById("decryptInput");
const keyInput = document.getElementById("keyInput");
const decryptBtn = document.getElementById("decryptBtn");

function checkDecryptInputs() {
  decryptBtn.disabled = !decryptInput.files.length; // Only image is required for decryption
}

decryptInput.addEventListener("change", checkDecryptInputs);
keyInput.addEventListener("change", checkDecryptInputs);

function setupDrop(dropId, inputId) {
  const dropZone = document.getElementById(dropId);
  const fileInput = document.getElementById(inputId);

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;

    // 🔄 Trigger change event manually so buttons update
    const event = new Event("change", { bubbles: true });
    fileInput.dispatchEvent(event);
  });
}

setupDrop("encryptDrop", "encryptInput");
setupDrop("decryptDrop", "decryptInput");
setupDrop("keyDrop", "keyInput");

// Handle Encrypt Form Submission
document.getElementById("encryptForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  // Add passkey to the form data
  const passkey = document.getElementById("encryptPasskey").value;
  form.append("passkey", passkey);

  try {
    const res = await fetch("/encrypt", { method: "POST", body: form });

    if (res.ok) {
      const blob = await res.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = "imageCypher_encrypted.zip";
      downloadLink.click();
      document.getElementById("encryptResult").textContent =
        "Encryption successful! File downloaded.";
    } else {
      const error = await res.json();
      console.error("Server error:", error.error);
      document.getElementById(
        "encryptResult"
      ).textContent = `Error: ${error.error}`;
    }
  } catch (err) {
    console.error("Client error:", err.message);
    document.getElementById(
      "encryptResult"
    ).textContent = `Error: ${err.message}`;
  }
});

// Handle Decrypt Form Submission
document.getElementById("decryptForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  // Add passkey to the form data
  const passkey = document.getElementById("decryptPasskey").value;
  form.append("passkey", passkey);

  const res = await fetch("/decrypt", { method: "POST", body: form });

  if (res.ok) {
    const blob = await res.blob();
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "imageCypher_decrypted.png";
    downloadLink.click();
    document.getElementById("decryptResult").textContent =
      "Decryption successful! File downloaded.";
  } else {
    const error = await res.json();
    document.getElementById(
      "decryptResult"
    ).textContent = `Error: ${error.error}`;
  }
});
