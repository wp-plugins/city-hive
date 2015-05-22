<?php
/**
 * Plugin Name: city-hive
 * Plugin URI: http://www.cityhive.net/wordpress
 * Description: Show City Hive buy local widget
 * Version: 0.1
 * Author: City Hive
 * Author URI: http://www.cityhive.net
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

  // Store plugin directory
  define('CITY_DIR', dirname(__FILE__));

  // Import modules
  require_once( join( DIRECTORY_SEPARATOR, array( CITY_DIR, 'city-hive-settings.php' ) ) );
  require_once( join( DIRECTORY_SEPARATOR, array( CITY_DIR, 'city-hive-update-handler.php' ) ) );
  require_once( join( DIRECTORY_SEPARATOR, array( CITY_DIR, 'city-hive-header-loader.php' ) ) );
  require_once( join( DIRECTORY_SEPARATOR, array( CITY_DIR, 'city-hive-widget.php' ) ) );
  require_once( join( DIRECTORY_SEPARATOR, array( CITY_DIR, 'city-hive-settings-menu.php' ) ) );



?>