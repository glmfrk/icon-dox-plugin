<?php
function icon_dox_modal_html() {
    ?>
    <div id="icon-dox-modal" class="icon-dox-modal">
        <div class="icon-dox-modal-content">
            <div class="icon-dox-header">
                <h2>Icon Library</h2>
                <span class="icon-dox-close">&times;</span>
            </div>
            <div class="icon-dox-body">
                <div class="icon-dox-sidebar">
                <ul class="icon-dox-tabs">
                    <li data-style="all" class="active">All Icons</li>
                    <li data-style="regular">Font Awesome - Regular</li>
                    <li data-style="solid">Font Awesome - Solid</li>
                    <li data-style="brands">Font Awesome - Brands</li>
                </ul>
                </div>
                <div class="icon-dox-main">
                    <input type="text" class="icon-dox-search" placeholder="Filter by name...">
                    <div class="icon-dox-icons" id="icon-dox-icons">
                        <!-- Icons will be dynamically loaded here -->
                    </div>
                </div>
            </div>
            <div class="icon-dox-footer">
                <button type="button" class="insert-icon-button">Insert</button>
            </div>
        </div>
    </div>
    <?php
}
add_action('admin_footer', 'icon_dox_modal_html');
