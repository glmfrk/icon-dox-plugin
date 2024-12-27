document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('icon-dox-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModal = document.querySelector('.icon-dox-close');
    const insertButton = document.querySelector('.insert-icon-button');
    const iconContainer = document.getElementById('icon-dox-icons');
    const tabs = document.querySelectorAll('.icon-dox-tabs li');
    const searchInput = document.querySelector('.icon-dox-search');
    const previewContainer = document.querySelector('.iconBox_media__preview');

    let icons = [];
    let selectedIcon = null;
    let currentLibrary = null;
    let currentStyle = 'all'; // Default to 'all' icons

    // Open Modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const library = button.getAttribute('data-library');
            currentLibrary = library;
            modal.style.display = 'block';
            modal.querySelector('h2').innerText = `${library.toUpperCase()} ICON LIBARAY`;
            fetchIcons(currentLibrary);
            toggleTabsVisibility(library, currentStyle); 
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        selectedIcon = null;
    });

    // Handle tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentStyle = tab.getAttribute('data-style');
            fetchIcons(currentLibrary);
        });
    });

    // Fetch Icons
    function fetchIcons(library) {
        iconContainer.innerHTML = ''; // Clear previous icons
        let ajaxURL;

        try {

            if (library === 'fontawesome') {
                ajaxURL = iconDoxAjax.fontawesome_json_url;
            } else if (library === 'iconsmind') {
                ajaxURL = iconDoxAjax.iconsmind_json_url;
            } else if (library === 'linea') {
                ajaxURL = iconDoxAjax.linea_json_url;
            } else if (library === 'linecon') {
                ajaxURL = iconDoxAjax.linecon_json_url;
            } else if (library === 'steadysets') {
                ajaxURL = iconDoxAjax.steadysets_json_url;
            } 

            fetch(ajaxURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status code: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                icons = library === 'fontawesome' ? parseFontAwesomeData(data) : parseRandomIconsData(data);
                
                renderIcons(); // Render icons based on the current style
            });
            
        } catch (error) {
            console.error('Error fetching icons:', error);
            iconContainer.innerHTML = '<p>Error loading icons. Please try again later.</p>';
        }
    }


    // Icons data parsing methods 
    function parseFontAwesomeData(data) {
        return Object.keys(data).map(key => ({
            name: key,
            class: key,
            styles: data[key].styles,
            unicode: data[key].unicode
        }));
    }

    function parseRandomIconsData(data) {
        return data.map(icon => ({
            name: icon.title,
            class: icon.class, // Assuming 'class' contains the styles
            attrs: icon["data-fip-value"]
        }));
    }

    // Render Icons
    function renderIcons() {
        let filteredIcons;

        if (currentStyle === 'all') {
            filteredIcons = icons; // Display all icons
        } else {
            filteredIcons = icons.filter(icon => icon.styles.includes(currentStyle));
        }

        if (filteredIcons.length === 0) {
            iconContainer.innerHTML = '<p>No icons found.</p>';
            return;
        }

        filteredIcons.forEach(icon => {
            const divElement = document.createElement('div');
            const iconElement = document.createElement('i');
            const spanElement = document.createElement('span');

            divElement.classList.add('iconItem');
            divElement.dataset.name = icon.name;
            
            if (currentLibrary === 'fontawesome') {
                const prefix = icon.styles && icon.styles.includes('brands') ? 'fab' : 'fa';
                iconElement.className = `${prefix} fa-${icon.name}`;
            } else {
                iconElement.className = icon.class;
            }


            spanElement.textContent = formatIconName(icon.name);
            divElement.setAttribute('title', formatIconName(icon.name));

            divElement.appendChild(iconElement);
            divElement.appendChild(spanElement);
            iconContainer.appendChild(divElement);

            
            // Icon selection
            divElement.addEventListener('click', function () {
                const allIcon = iconContainer.querySelectorAll('.iconItem');
                allIcon.forEach(el => el.classList.remove('selected'));
                divElement.classList.add('selected');
                selectedIcon = icon.name;
            });
        });
    }

    // Format Icon Name
    function formatIconName(icon) { 
        let result = icon.replace(/(fab|fas|fa|fa-|iconsmind|icon-arrows|linecon|steadysets)/gi, '').trim();
        result = result.replace(/-/i, ' ').trim();

        // Capitalize the first letter of each word
        return result.split('-').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    // Insert Selected Icon
    insertButton.addEventListener('click', () => {
        if (selectedIcon) {
            
            const selectedIconData = icons.find(icon => icon.class === selectedIcon);

            // Clear existing icon in the preview container
            previewContainer.innerHTML = '';

            // Create a new <i> element for the selected icon
            const iconElement = document.createElement('i');
            const otherLibraries = ['iconsmind', 'linea', 'linecon', 'steadysets'];
            if (currentLibrary === 'fontawesome') {
                const prefix = selectedIconData.styles.includes('brands') ? 'fab' : 'fa';
                iconElement.className = `${prefix} fa-${selectedIcon}`;
            } else if (otherLibraries.includes(currentLibrary)) {
                iconElement.className = selectedIconData.class; 
            }

            previewContainer.appendChild(iconElement);

            // Close the modal after inserting the icon
            modal.style.display = 'none';
            selectedIcon = null;
        } else {
            alert('Please select an icon before inserting.');
        }
    });

    // Filter Icons
    searchInput.addEventListener('input', (event) => {
        const filter = event.target.value.toLowerCase();
        document.querySelectorAll('#icon-dox-icons .iconItem').forEach(icon => {
            const iconName = icon.getAttribute('title').toLowerCase();
            icon.style.display = iconName.includes(filter) ? 'block' : 'none';
        });
    });

    // Toggle Tabs Visibility
    function toggleTabsVisibility(library) {
        tabs.forEach(tab=>{
            const dataStyle = tab.getAttribute('data-style');
            if (library === 'fontawesome' || dataStyle === 'all') {
                tab.style.display = 'block';
            } else {
                tab.style.display = 'none';
            }
            const allTab = document.querySelector('.icon-dox-tabs li[data-style="all"]');
            if (allTab) {
                allTab.classList.add('active');
                tab.classList.remove('active');
                currentStyle = 'all';
            }
        });
    }
});
