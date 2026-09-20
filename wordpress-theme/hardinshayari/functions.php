<?php
function hardinshayari_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
  register_nav_menus([
    'primary' => __('Primary Menu', 'hardinshayari'),
  ]);
}
add_action('after_setup_theme', 'hardinshayari_setup');

function hardinshayari_scripts() {
  wp_enqueue_style('hardinshayari-style', get_stylesheet_uri(), [], '1.0');
}
add_action('wp_enqueue_scripts', 'hardinshayari_scripts');

// Wider excerpt for card snippets.
function hardinshayari_excerpt_length($length) { return 20; }
add_filter('excerpt_length', 'hardinshayari_excerpt_length');
