document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('icon-dox-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModal = document.querySelector('.icon-dox-close');
    const insertButton = document.querySelector('.insert-icon-button');
    const iconContainer = document.getElementById('icon-dox-icons');
    const tabs = document.querySelectorAll('.icon-dox-tabs li');
    const searchInput = document.querySelector('.icon-dox-search');

    // display preview icon "div"
    const previewContainer = document.querySelector('.iconBox_media__preview');

    let icons = [];
    let selectedIcon = null;
    let currentLibrary = null;
    let currentStyle = 'all'; // Default to 'all' icons

    // Font Awesome API URL
    const fontawesomeURL = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json';

    // Open Modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'block';
            const library = button.getAttribute('data-library');
            currentLibrary = library;
            fetchIcons(library); // Fetch icons for the selected library when modal opens
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

    function fetchIcons(library) {
        iconContainer.innerHTML = ''; // Clear previous icons
        try {
            if (library === 'fontawesome') {
                fetch(fontawesomeURL)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status code is : ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        icons = Object.keys(data).map(key => ({
                            name: key,
                            styles: data[key].styles,
                            unicode: data[key].unicode
                        }));
                        renderIcons(); // Render icons based on the current style
                    });
            } else if (library === 'flaticons') {
                fetch(iconDoxAjax.flaticons_json_url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status code is : ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        icons = data.icons; 
                        renderIcons(); 
                    });
            }
        } catch (error) {
            console.error('Error fetching icons:', error);
            iconContainer.innerHTML = '<p>Error loading icons. Please try again later.</p>';
        }
    }

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

            // Create Icon Items 
            const divElement = document.createElement('div');
            const iconElement = document.createElement('i');
            const spanElement = document.createElement('span');

            divElement.classList.add('iconItem');
            divElement.dataset.name = icon.name;
       

            const prefix = icon.styles && icon.styles.includes('brands') ? 'fab' : 'fa';
            iconElement.className = `${prefix} fa-${icon.name}`;
            spanElement.textContent = formatIconName(icon.name);
            divElement.setAttribute('title', formatIconName(icon.name));

            divElement.appendChild(iconElement);
            divElement.appendChild(spanElement);
            iconContainer.appendChild(divElement);

            divElement.addEventListener('click', function () {
                const allIcon = iconContainer.querySelectorAll('.iconItem');
                allIcon.forEach(el => el.classList.remove('selected'));
                divElement.classList.add('selected');
                selectedIcon = icon.name;   
            });
        });
    }

    function formatIconName(icon) {
        
        let result = icon.replace(/(fab|fas|fa|fa-)/gi, '').trim();
        result = result.replace(/-/i, ' ').trim();

        // Capitalize the first letter of each word
        const title = result.split('-').map(word => {
            let firstLetter = word[0].toUpperCase();
            return firstLetter + word.slice(1);
        }).join(' ');
        
        return title;
        
    }

    // Insert Selected Icon
    insertButton.addEventListener('click', () => {
        if (selectedIcon) {

            const selectedIconData = icons.find(icon => icon.name === selectedIcon);
            const prefix = selectedIconData.styles.includes('brands') ? 'fab' : 'fa';

            // Clear existing icon in the preview container
            previewContainer.innerHTML = '';

            // Create a new <i> element for the selected icon
            const iconElement = document.createElement('i');
            iconElement.className = `${prefix} fa-${selectedIcon}`;
            previewContainer.appendChild(iconElement);

            // close the modal after inserting the icon
            modal.style.display = 'none';
            selectedIcon = null; 
        } else {
            alert('Please select an icon before inserting.');
        }
    });


});
