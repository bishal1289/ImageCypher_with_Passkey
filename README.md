 # ImageCypher - Secure Image Encryption and Decryption

# Project Overview
ImageCypher is a Node.js-based application that allows users to securely encrypt and decrypt images using a passkey. The application uses XOR-based encryption and embeds a SHA-256 hash of the passkey for verification during decryption. It provides a simple web interface for users to upload images, enter a passkey, and download the encrypted or decrypted files.

# Features
  - Image Encryption:
    - Encrypts images using XOR encryption with a user-provided passkey.
    - Embeds a SHA-256 hash of the passkey for verification.
    - Outputs the encrypted image as a downloadable .zip file.
  
  - Image Decryption:
    - Verifies the passkey using the embedded hash.
    - Decrypts the image using the same XOR logic.
    - Outputs the decrypted image as a downloadable file.
  
  - Web Interface:
    - User-friendly forms for uploading images and entering passkeys.
    - Dynamic validation to ensure both image and passkey are provided.
  
  - File Handling:
    - Temporary files are cleaned up after processing.

# Technologies Used
 - Backend:
  - Node.js
  - Express.js
  - Multer for file uploads
  - Crypto for hashing
  - Adm-Zip for creating zip files
 
 - Frontend:
  - EJS for templating
  - HTML, CSS, and JavaScript for the user interface

# Installation
## Prerequisites
 - Node.js installed on your system.
## Steps
 1. Clone the repository:
    ```
    git clone https://github.com/bishal1289/ImageCypher_with_Passkey.git
    cd ImageCypher_with_Passkey
    ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
    npm start
   ```
4. Open your browser and navigate to
   ```
   http://localhost:3000
   ```
# Usage
 - Encrypt an Image
    1. Go to the Encrypt Image section on the homepage.
    2. Upload an image file.
    3. Enter a passkey.
    4. Click the Encrypt button.
    5. Download the encrypted .zip file.
     
 - Decrypt an Image
    1. Go to the Decrypt Image section on the homepage.
    2. Upload the encrypted image file.
    3. Enter the same passkey used during encryption.
    4. Click the Decrypt button.
    5. Download the decrypted image file.

# Project Structure
```
 imageCypher/
├── public/                 # Static files (CSS, JS, images)
│   ├── scripts/
│   │   └── main.js         # Client-side JavaScript
│   ├── styles/
│   │   └── style.css       # Custom styles
├── uploads/                # Temporary storage for uploaded files
├── views/                  # EJS templates
│   └── index.ejs           # Main HTML template
├── server.js               # Main server-side application
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```
# Code Explanation
## Key Functions
1. xorEncryptDecrypt(data, passkey):
  - Performs XOR-based encryption and decryption.
  - Symmetric operation: the same function is used for both encryption and     decryption.

2. generateHash(passkey):
  - Generates a SHA-256 hash of the passkey for verification during 
    decryption.

3. Routes:
 - GET /:
   - Serves the homepage with encryption and decryption forms.
 - POST /encrypt:
   - Handles image encryption.
   - Combines the passkey hash and encrypted data into a single file.
   - Sends the encrypted file as a .zip download.
 - POST /decrypt:
   - Handles image decryption.
   - Verifies the passkey hash before decrypting the image.
   - Sends the decrypted image as a download.

# Security Considerations
 - XOR Encryption:
  - While XOR encryption is simple and fast, it is not secure for real-   
    world applications. This project is for educational purposes only.
 - Passkey Hashing:
  - A SHA-256 hash of the passkey is embedded in the encrypted file to 
    ensure the correct passkey is used during decryption.
 - File Cleanup:
  - Temporary files are deleted after processing to prevent unauthorized 
    access.

# Future Improvements
 - Add support for stronger encryption algorithms (e.g., AES).
 - Implement user authentication for added security.
 - Allow users to customize the output file name.
 - Add error handling for unsupported file types.

# Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

# Snapshot

![Screenshot (165)](https://github.com/user-attachments/assets/5f74c273-e066-459b-8378-d32d7de4d991)
