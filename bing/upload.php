<?php
    $token=$_GET["token"];
    $data=urldecode(base64_decode($_GET["data"]));
    if(sha1($token)=="4b64cf27abf6d16b137030dbd694297ea4cf98a6"){
        $file = fopen("bing.json", "w");
        fwrite($file, $data);
        fclose($file);
        echo "Success";
    }
    else {
        echo "TokenError";
    }
    echo sha1("SparkHome243.");
?>