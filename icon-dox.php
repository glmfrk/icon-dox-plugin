<?php
/**
 * Plugin Name: Icon Dox
 * Description: A plugin to select icons from Font Awesome or Flat Icons.
 * Version: 1.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit;

// Enqueue scripts and styles
function icon_dox_enqueue_assets() {
    wp_enqueue_style(
        'font-awesome', 
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', 
        array(), 
        '6.5.0' 
    );
    // wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

    wp_enqueue_style('iconsmind-font-style', plugins_url('assets/css/iconsmind.css', __FILE__));
    wp_enqueue_style('linea-font-style', plugins_url('assets/css/fonts/svg/font/style.css', __FILE__));
    wp_enqueue_style('linecon-font-style', plugins_url('assets/css/linecon.css', __FILE__));
    wp_enqueue_style('steadysets-font-style', plugins_url('assets/css/steadysets.css', __FILE__));

    wp_enqueue_style('modal-style', plugins_url('assets/css/modal-style.css', __FILE__));
    wp_enqueue_style('icon-dox-style', plugins_url('assets/css/icon-dox.css', __FILE__));

    wp_enqueue_script('icon-dox-script', plugins_url('assets/js/icon-dox.js', __FILE__), ['jquery'], null, true);

    wp_localize_script('icon-dox-script', 'iconDoxAjax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'fontawesome_json_url' => plugins_url('assets/data/fortawesome.json', __FILE__),
        'iconsmind_json_url' => plugins_url('assets/data/iconsmind.json', __FILE__),
        'linea_json_url' => plugins_url('assets/data/linea.json', __FILE__),
        'linecon_json_url' => plugins_url('assets/data/linecon.json', __FILE__),
        'steadysets_json_url' => plugins_url('assets/data/steadysets.json', __FILE__),
    ]);

}
add_action('admin_enqueue_scripts', 'icon_dox_enqueue_assets');

// Include backend settings and modal handler
require_once plugin_dir_path(__FILE__) . 'includes/icon-dox-settings.php';
require_once plugin_dir_path(__FILE__) . 'includes/icon-dox-modal.php';


function icon_dox_display_icon($atts) {
    $atts = shortcode_atts(['class' => ''], $atts);
    return '<i class="' . esc_attr($atts['class']) . '"></i>';
}
add_shortcode('icon-dox', 'icon_dox_display_icon');
