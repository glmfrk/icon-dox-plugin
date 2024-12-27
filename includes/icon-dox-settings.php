<?php
function icon_dox_add_menu() {
    add_menu_page('Icon Dox', 'Icon Dox', 'manage_options', 'icon-dox', 'icon_dox_settings_page');
}
add_action('admin_menu', 'icon_dox_add_menu');

function icon_dox_settings_page() {
    ?>
    <div class="wrap">
        <h1>Icon Dox Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('icon-dox-settings');
            do_settings_sections('icon-dox-settings');
            ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Icon Library</th>
                    <td>
                        <div class="iconBox_preview_wrapper">
                            <div class="iconBox_preview_box" >
                                <div class="icon_remove" title="Remove">
                                    <span>Remove</span>
                                </div>
                                <div class="iconBox_media__preview">
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div name="icon_dox_library" id="icon_dox_library">
                                <button type="button" class="open-modal" data-library="fontawesome">Font Awesome Library</button>
                                <button type="button" class="open-modal" data-library="iconsmind">Iconsmind Icon Library</button>
                                <button type="button" class="open-modal" data-library="linea">Linea Icon Library</button>
                                <button type="button" class="open-modal" data-library="linecon">Linecon Icon Library</button>
                                <button type="button" class="open-modal" data-library="steadysets">Steadysets Icon Library</button>
                          
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <?php
}
