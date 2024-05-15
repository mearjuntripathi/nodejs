const fs = require('fs');
const { google } = require('googleapis');

// Load API credentials from JSON file
const apikeys = require('API_FILE_PATH');  // Replace 'API_FILE_PATHE' with the downloaded api file path

// Define the scope for Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Function to authorize and get access to Google Drive API
async function authorize() {
    const auth = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPES
    );

    try {
        await auth.authorize();
        return auth;
    } catch (error) {
        throw new Error(`Error authorizing Google Drive API: ${error.message}`);
    }
}

// Function to list available files in Google Drive
async function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });

    try {
        const response = await drive.files.list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        });

        const files = response.data.files;
        if (files.length) {
            console.log('Available files:');
            files.forEach(file => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    } catch (error) {
        throw new Error(`Error listing files in Google Drive: ${error.message}`);
    }
}

// Function to upload a file to Google Drive
async function uploadFile(auth, filePath, folderId) {
    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: filePath.split('/').pop(), // Extract file name from path
        parents: [folderId] // Folder ID to upload the file into
    };

    const media = {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath) // Readable stream for file upload
    };

    try {
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        console.log('File uploaded successfully. File ID:', response.data.id);
        return response.data;
    } catch (error) {
        throw new Error(`Error uploading file to Google Drive: ${error.message}`);
    }
}

// Function to delete a file from Google Drive
async function deleteFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });

    try {
        await drive.files.delete({
            fileId: fileId
        });

        console.log('File deleted successfully.');
    } catch (error) {
        throw new Error(`Error deleting file from Google Drive: ${error.message}`);
    }
}

// Function to update a file in Google Drive
async function updateFile(auth, fileId, filePath) {
    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: filePath.split('/').pop() // Extract file name from path
    };

    const media = {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath) // Readable stream for file update
    };

    try {
        const response = await drive.files.update({
            fileId: fileId,
            resource: fileMetadata,
            media: media
        });

        console.log('File updated successfully.');
    } catch (error) {
        throw new Error(`Error updating file in Google Drive: ${error.message}`);
    }
}

// Main function to demonstrate file operations
async function main() {
    try {
        const authClient = await authorize();

        // List available files
        console.log('Available files:');
        await listFiles(authClient);

        // Upload a file
        const uploadedFile = await uploadFile(authClient, 'test.txt', 'FOLDER_ID_HERE'); // Replace 'FOLDER_ID_HERE' with the desired folder ID
        const fileId = uploadedFile.id;

        // Update the uploaded file
        await updateFile(authClient, fileId, 'updated_test.txt');

        // Delete the uploaded file
        await deleteFile(authClient, '1kWgn2c_yfXWDnT4DC6ZlUJEG37w79JxA');
    } catch (error) {
        console.error(error);
    }
}

// Call the main function to start the process
main();
