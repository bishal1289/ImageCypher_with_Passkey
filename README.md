 # ImageCypher - Secure Image Encryption and Decryption

# Project Overview
ImageCypher is a Node.js-based application that allows users to securely encrypt and decrypt images using a passkey. The application uses XOR-based encryption and embeds a SHA-256 hash of the passkey for verification during decryption. It provides a simple web interface for users to upload images, enter a passkey, and download the encrypted or decrypted files.

Features
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
