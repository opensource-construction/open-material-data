async function fetchMaterial(fileName) {
    try {
        const response = await fetch(`materials/${fileName}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching material:', error);
        return null;
    }
}

async function loadMaterial() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');
    if (fileName) {
        const material = await fetchMaterial(fileName);
        if (material) {
            displayMaterialDetails(material);
        } else {
            console.error('Material not found');
        }
    } else {
        console.error('No JSON file name provided');
    }
}

loadMaterial();

function displayMaterialDetails(material) {
    const tableHead = document.getElementById('detailsTableHead');
    const tableBody = document.getElementById('detailsTableBody');

    // Clear any existing table head and body content
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    // Iterate through the material properties and create table rows
    for (const key in material) {
        const row = document.createElement('tr');

        // Create the table header cell (for the key)
        const th = document.createElement('th');
        th.textContent = key;
        th.classList.add('first-column');
        row.appendChild(th);

        // Create the table data cell (for the value)
        const td = document.createElement('td');
        td.textContent = material[key];
        row.appendChild(td);

        tableBody.appendChild(row);
    }
}


