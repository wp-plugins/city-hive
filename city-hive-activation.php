<?php

$plugin = plugin_basename(CITY_DIR . '\city-hive.php');
register_activation_hook($plugin , 'city_hive_on_activation' );
register_activation_hook($plugin , 'city_hive_on_activation' );
register_deactivation_hook($plugin, 'city_hive_on_deactivation' );
register_uninstall_hook( $plugin, 'city_hive_on_uninstall' );

function city_hive_on_activation(){
   //
}


function city_hive_on_deactivation(){
    //
}
function city_hive_on_uninstall(){}
   //
?>