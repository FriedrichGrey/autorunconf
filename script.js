document.getElementById('fileInput').addEventListener('change', (event) => {
    const files = event.target.files;
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
        if (files[i].name.endsWith('.ifc')) {
            fileNames.push(files[i].webkitRelativePath);
        }
    }

    // Now you have an array of IFC filenames
    console.log(fileNames);
    // You can now generate your XMLs and ZIP as needed
});

function listFileNames() {
    // Your logic to handle the listing of file names
}
