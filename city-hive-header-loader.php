<?php

  function city_hive_get_script() {
    global $CITY_HIVE_SETTINGS;
    return "<script src='" . $CITY_HIVE_SETTINGS["script_url"] . "'></script>";
  }

  function city_hive_generate_meta_str($side_bar, $product_list, $related_products_list, $producers_list, $noshow_products) {
    return '<meta name="city-hive-object" content="' . esc_attr(json_encode(array('sideBar' => $side_bar, 'products' => $product_list, 'relatedProducts' => $related_products_list, 'producers' => $producers_list, 'noShow' => $noshow_products,))) . '" />';
  }



  function city_hive_load_post_products($postid) {
    global $CITY_HIVE_SETTINGS;
    $meta = array();

    $data = get_post_meta($postid, $CITY_HIVE_SETTINGS["products_metadata_name"], true);
    if (is_array($data)) {
      $meta = array_merge($meta, $data);
    }

    $data = get_post_meta($postid, $CITY_HIVE_SETTINGS["metadata_name_auto"], true);
    if (is_array($data)) {
      $meta = array_merge($meta, $data);
    }

    return $meta;
  }

  function city_hive_load_post_related_products($postid) {
    global $CITY_HIVE_SETTINGS;
    $meta = array();
    $data = get_post_meta($postid, $CITY_HIVE_SETTINGS["related_products_metadata_name"], true);
    if (is_array($data)) {
      $meta = array_merge($meta, $data);
    }
    return $meta;
  }


function city_hive_load_post_producers($postid) {
    global $CITY_HIVE_SETTINGS;
    $meta = array();
    $data = get_post_meta($postid, $CITY_HIVE_SETTINGS["producers_metadata_name"], true);
    if (is_array($data)) {
        $meta = array_merge($meta, $data);
    }
    return $meta;
}


function city_hive_load_noshow_property($postid) {
    global $CITY_HIVE_SETTINGS;

    $meta = get_post_meta($postid, $CITY_HIVE_SETTINGS["products_noshow_meta"], true);
    return $meta;
}



  function city_hive_get_post_metadata($post) {

    $products = city_hive_load_post_products($post->ID);
    $relatedProducts = city_hive_load_post_related_products($post->ID);
    $producers = city_hive_load_post_producers($post->ID);
    $noShowProducts = city_hive_load_noshow_property($post->ID);

    if (count($products) > 0 || count($relatedProducts) > 0 || count($producers) > 0 ){
      return city_hive_generate_meta_str(true, $products, $relatedProducts, $producers, $noShowProducts);
    }
    return '';
  }

  function city_hive_get_multiple_posts_metadata() {
    global $post;

    if (get_option('show_in_multiple_posts_pages') === 'true') {
      $merged_products = array();
      $merged_related_products = array();
      $merged_producers = array();
      while (have_posts()) {
        the_post();
        $products = city_hive_load_post_products($post->ID);
        if (count($products) > 0) {
          $merged_products = array_merge($merged_products, $products);
        }

        $related_products = city_hive_load_post_related_products($post->ID);
        if (count($related_products) > 0) {
          $merged_related_products = array_merge($merged_related_products, $related_products);
        }
        $producers = city_hive_load_post_producers($post->ID);
        if (count($producers)>0) {
            $merged_producers = array_merge($merged_producers, $producers);
        }
      }
      if (count($merged_products) >0  || count($merged_related_products)>0 || count($merged_producers)>0 )  {
        return city_hive_generate_meta_str(false, $merged_products, $merged_related_products,$merged_producers);
      }
    }
    return '';
  }

  function city_hive_generate_metatags() {
	$metadata_arr[]='';
    if (is_singular()) {
      $post = get_queried_object();
      $metadata_arr[] = city_hive_get_post_metadata($post);
    } elseif (have_posts()) {
      $metadata_arr[] = city_hive_get_multiple_posts_metadata();
      rewind_posts();
    }

	return $metadata_arr;
		
  }


  function city_hive_add_header() {
    $meta_tags = implode(PHP_EOL, city_hive_generate_metatags());

    echo PHP_EOL . city_hive_get_script() . PHP_EOL . PHP_EOL;

    if ($meta_tags) {
      echo PHP_EOL . $meta_tags . PHP_EOL . PHP_EOL;
    }
  }


  // called when writing page head
  add_action('wp_head', 'city_hive_add_header', 0);
?>