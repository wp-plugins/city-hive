<?php

$plugin = plugin_basename(CITY_DIR . '\city-hive.php');
register_activation_hook($plugin , 'city_hive_on_activation' );
register_activation_hook($plugin , 'city_hive_on_activation' );
register_deactivation_hook($plugin, 'city_hive_on_deactivation' );
register_uninstall_hook( $plugin, 'city_hive_on_uninstall' );

function city_hive_on_activation(){
    //exit();
    $itai = "activation";
    //add_action( 'admin_notices', 'city_hive_hello');
    //$response = file_get_contents('http://example.com/path/to/api/call?param1=5');
}


function city_hive_on_deactivation(){
    //exit();
    $itai = "deactivation";
}
function city_hive_on_uninstall(){}
    $itai = "uninstall";
?>