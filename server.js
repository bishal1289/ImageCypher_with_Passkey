const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // To parse form data

// XOR function
function xorEncryptDecrypt(data, passkey) {
  const key = Buffer.from(passkey);
  const result = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i++) {
    result[i] = data[i] ^ key[i % key.length];
  }

  return result;
}

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Generate a SHA-256 hash of the passkey
function generateHash(passkey) {
  return crypto.createHash("sha256").update(passkey).digest("hex");
}

// Encrypt route
app.post("/encrypt", upload.single("image"), async (req, res) => {
  const uploadedPath = req.file.path;
  const originalName = req.file.originalname;
  const ext = path.extname(originalName);
  const name = path.parse(originalName).name;
  const timestamp = Date.now();
  const passkey = req.body.passkey; // Get passkey from user input

  const encryptedImageName = `${name}_encrypted_${timestamp}${ext}`;
  const outputImg = path.join("uploads", encryptedImageName);

  try {
    // Read the uploaded image
    const imageData = fs.readFileSync(uploadedPath);

    // Generate a hash of the passkey
    const passkeyHash = generateHash(passkey);

    // Apply XOR encryption
    const encryptedData = xorEncryptDecrypt(imageData, passkey);

    // Combine the hash and encrypted data
    const finalData = Buffer.concat([
      Buffer.from(passkeyHash, "hex"), // Add the hash at the beginning
      encryptedData,
    ]);

    // Save the encrypted image
    fs.writeFileSync(outputImg, finalData);

    console.log("Encrypted image saved at:", outputImg);

    // Clean up the uploaded file
    fs.unlinkSync(uploadedPath);

    // Create a zip file
    const zipPath = path.join("uploads", `${name}_encrypted_${timestamp}.zip`);
    const AdmZip = require("adm-zip");
    const zip = new AdmZip();
    zip.addLocalFile(outputImg);
    zip.writeZip(zipPath);

    console.log("Zip file created at:", zipPath);

    // Send the zip file to the client
    res.download(zipPath, () => {
      console.log("Zip file sent to client.");
      fs.unlinkSync(zipPath); // Clean up the zip file
      fs.unlinkSync(outputImg); // Clean up the encrypted image
    });
  } catch (err) {
    console.error("Error during encryption:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Decrypt route
app.post("/decrypt", upload.single("image"), async (req, res) => {
  const uploadedPath = req.file.path;
  const originalName = req.file.originalname;
  const ext = path.extname(originalName);
  const name = path.parse(originalName).name;
  const timestamp = Date.now();
  const passkey = req.body.passkey; // Get passkey from user input

  const decryptedImageName = `${name}_decrypted_${timestamp}${ext}`;
  const outputImg = path.join("uploads", decryptedImageName);

  try {
    // Read the uploaded encrypted image
    const encryptedData = fs.readFileSync(uploadedPath);

    // Extract the hash and encrypted data
    const passkeyHash = encryptedData.slice(0, 32).toString("hex"); // First 32 bytes (SHA-256 hash)
    const actualEncryptedData = encryptedData.slice(32); // Remaining data

    // Verify the passkey hash
    const providedHash = generateHash(passkey);
    if (providedHash !== passkeyHash) {
      // Send an error response if the passkey is invalid
      return res.status(400).json({ error: "Invalid passkey provided." });
    }

    // Apply XOR decryption (same as encryption)
    const decryptedData = xorEncryptDecrypt(actualEncryptedData, passkey);

    // Save the decrypted image
    fs.writeFileSync(outputImg, decryptedData);

    // Clean up the uploaded file
    fs.unlinkSync(uploadedPath);

    res.download(outputImg, () => {
      fs.unlinkSync(outputImg); // Clean up the decrypted file after download
    });
  } catch (err) {
    console.error("Error during decryption:", err.message);

    // Clean up the uploaded file in case of an error
    if (fs.existsSync(uploadedPath)) {
      fs.unlinkSync(uploadedPath);
    }

    res.status(500).json({ error: "An error occurred during decryption." });
  }
});

app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
