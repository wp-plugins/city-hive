<?php

  function city_hive_post_page_to_server( $content, $title ) {
    global $CITY_HIVE_SETTINGS;
    $url = $CITY_HIVE_SETTINGS["api_endpoint"];
    $data = array('content' => $content, 'title' => $title);

    // use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );
    $context  = stream_context_create($options);
    $result = json_decode(@file_get_contents($url, false, $context));

    if ($result && ($result->result === 0) && is_array($result->data)) {
      return $result->data;
    }

    return false;
  }


  function city_hive_handle_save( $title ) {
    global $CITY_HIVE_SETTINGS;
    global $post;

    $results = city_hive_post_page_to_server( $post->post_content, $title );

    if ($results) {
      update_post_meta($post->ID, $CITY_HIVE_SETTINGS["metadata_name_auto"], $results);
    }

    return $title;
  }

  add_filter( 'title_save_pre', 'city_hive_handle_save' );
?>