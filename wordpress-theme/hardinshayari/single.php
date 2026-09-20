<?php get_header(); ?>

<div class="container post-page">
  <?php while (have_posts()) : the_post(); ?>
    <div class="breadcrumb">
      <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
      <?php $cats = get_the_category(); if (!empty($cats)) : ?>
        / <a href="<?php echo esc_url(get_category_link($cats[0]->term_id)); ?>"><?php echo esc_html($cats[0]->name); ?></a>
      <?php endif; ?>
    </div>

    <h1><?php the_title(); ?></h1>

    <div class="meta-row">
      <span><?php echo get_the_date(); ?></span>
    </div>

    <div class="entry-content"><?php the_content(); ?></div>

    <?php
    preg_match('/<img[^>]+src="([^"]+)"/', get_the_content(), $m);
    $card_image = $m[1] ?? '';
    if ($card_image) : ?>
    <div class="actions">
      <a class="btn btn-primary" href="<?php echo esc_url($card_image); ?>" download>⬇ Download HD Photo</a>
      <a class="btn btn-outline" href="https://wa.me/?text=<?php echo urlencode(get_the_title() . ' — ' . get_permalink()); ?>" target="_blank" rel="noopener">Share on WhatsApp</a>
    </div>
    <?php endif; ?>

    <?php
    $post_tags = get_the_tags();
    if ($post_tags) : ?>
      <div class="tags">
        <?php foreach ($post_tags as $tag) : ?>
          <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>">#<?php echo esc_html($tag->name); ?></a>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <?php
    $cats = get_the_category();
    if (!empty($cats)) :
      $related = new WP_Query([
        'category__in' => [$cats[0]->term_id],
        'post__not_in' => [get_the_ID()],
        'posts_per_page' => 4,
      ]);
      if ($related->have_posts()) : ?>
        <div class="section-title"><h2>More <?php echo esc_html($cats[0]->name); ?></h2></div>
        <div class="grid">
          <?php while ($related->have_posts()) : $related->the_post(); ?>
            <a class="post-card" href="<?php the_permalink(); ?>">
              <div class="thumb">
                <?php
                preg_match('/<img[^>]+src="([^"]+)"/', get_the_content(), $rm);
                if (!empty($rm[1])) echo '<img src="' . esc_url($rm[1]) . '" alt="' . esc_attr(get_the_title()) . '">';
                ?>
              </div>
              <div class="body">
                <div class="cat"><?php echo esc_html($cats[0]->name); ?></div>
                <div class="snippet"><?php echo wp_trim_words(get_the_excerpt(), 12, '…'); ?></div>
              </div>
            </a>
          <?php endwhile; wp_reset_postdata(); ?>
        </div>
      <?php endif;
    endif; ?>

  <?php endwhile; ?>
</div>

<?php get_footer(); ?>
