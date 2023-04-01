document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('tableBody');

    async function fetchMaterials() {
        try {
            const response = await fetch('materials/index.json');
            const materials = await response.json();
            return materials;
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        }
    }

    function createTableHeader(keys) {
        const thead = document.querySelector('table thead');
        const tr = document.createElement('tr');
        
        keys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            tr.appendChild(th);
        });
    
        thead.appendChild(tr);
    }
    

    function createTableRow(material) {
        const tr = document.createElement('tr');
        
        // Create a table cell for each property
        for (const key in material) {
            const td = document.createElement('td');
            
            // Check if the property is 'material_name', create a link in this case
            if (key === 'material_name') {
                const a = document.createElement('a');
                a.href = `product.html?file=${material.material_ID}`;
                a.textContent = material[key];
                td.appendChild(a);
            } else {
                td.textContent = material[key];
            }
            
            tr.appendChild(td);
        }
    
        return tr;
    }
    

    async function populateTable() {
        const materials = await fetchMaterials();
        if (!materials || materials.length === 0) return;
    
        // Create table header
        const keys = Object.keys(materials[0]);
        createTableHeader(keys);
    
        // Populate table rows
        tableBody.innerHTML = '';
        materials.forEach(material => {
            const row = createTableRow(material);
            tableBody.appendChild(row);
        });
    }

    function filterTable(searchText) {
        const rows = tableBody.getElementsByTagName('tr');
        for (const row of rows) {
            const cellText = row.textContent.toLowerCase();
            if (cellText.includes(searchText.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    searchInput.addEventListener('input', () => {
        filterTable(searchInput.value);
    });

    populateTable();
});
