<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <div class="container row">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
      <span class="mark">✒</span>
      <span><?php bloginfo('name'); ?></span>
    </a>
    <nav class="nav">
      <?php
      wp_nav_menu([
        'theme_location' => 'primary',
        'container' => false,
        'items_wrap' => '%3$s',
        'fallback_cb' => function () {
          wp_list_categories(['title_li' => '', 'depth' => 1]);
        },
      ]);
      ?>
    </nav>
  </div>
</header>
