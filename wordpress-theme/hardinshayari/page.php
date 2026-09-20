<?php get_header(); ?>

<div class="wrap-narrow post-page">
  <?php while (have_posts()) : the_post(); ?>
    <div class="breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Home</a> / <?php the_title(); ?></div>
    <h1><?php the_title(); ?></h1>
    <div class="entry-content"><?php the_content(); ?></div>
  <?php endwhile; ?>
</div>

<?php get_footer(); ?>
