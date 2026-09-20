<?php get_header(); ?>

<div class="container post-page">
  <div class="breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Home</a> / <?php the_archive_title(); ?></div>
  <h1><?php the_archive_title('', ''); ?></h1>

  <?php if (have_posts()) : ?>
    <div class="grid">
      <?php while (have_posts()) : the_post(); ?>
        <a class="post-card" href="<?php the_permalink(); ?>">
          <div class="thumb">
            <?php if (has_post_thumbnail()) { the_post_thumbnail('medium_large'); }
            else {
              preg_match('/<img[^>]+src="([^"]+)"/', get_the_content(), $m);
              if (!empty($m[1])) echo '<img src="' . esc_url($m[1]) . '" alt="' . esc_attr(get_the_title()) . '">';
            } ?>
          </div>
          <div class="body">
            <div class="cat"><?php echo get_the_category()[0]->name ?? ''; ?></div>
            <div class="snippet"><?php echo wp_trim_words(get_the_excerpt(), 12, '…'); ?></div>
          </div>
        </a>
      <?php endwhile; ?>
    </div>

    <div class="pagination">
      <?php echo paginate_links(['prev_text' => '← Prev', 'next_text' => 'Next →']); ?>
    </div>
  <?php else : ?>
    <p><?php _e('No shayari found in this category yet.', 'hardinshayari'); ?></p>
  <?php endif; ?>
</div>

<?php get_footer(); ?>
