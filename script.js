document.getElementById('fileInput').addEventListener('change', (event) => {
    const files = event.target.files;
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
        if (files[i].name.endsWith('.ifc')) {
            fileNames.push(files[i].webkitRelativePath);
        }
    }

    // Clear previous file list
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    // Display the file names
    fileNames.forEach((fileName) => {
        const listItem = document.createElement('li');
        listItem.textContent = fileName;
        fileList.appendChild(listItem);
    });

    // Generate XML and create a zip file
    generateXMLandZip(fileNames);
});

function generateXMLandZip(fileNames) {
    const JSZip = require('jszip');
    const zip = new JSZip();

    fileNames.forEach((fileName) => {
        // Generate XML content (customize this part according to your needs)
        const xmlContent = `<root>
                                <filename>${fileName}</filename>
                                <!-- Add more XML data here -->
                            </root>`;

        // Add XML content to the zip file
        zip.file(fileName.replace(/\.ifc$/, '.xml'), xmlContent);
    });

    // Generate the zip file
    zip.generateAsync({ type: 'blob' })
        .then(function (content) {
            // Create a download link for the zip file
            const zipBlob = new Blob([content]);
            const zipURL = URL.createObjectURL(zipBlob);
            
            // Create the download button
            const downloadButton = document.createElement('a');
            downloadButton.href = zipURL;
            downloadButton.download = 'ifc_files.zip';
            downloadButton.textContent = 'Download Zip';
            
            // Append the download button to the container
            const downloadButtonContainer = document.getElementById('downloadButtonContainer');
            downloadButtonContainer.innerHTML = ''; // Clear previous button (if any)
            downloadButtonContainer.appendChild(downloadButton);
        });
}
