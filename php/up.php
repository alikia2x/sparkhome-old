<?php
$fileName = $_FILES['afile']['name'];
$fileContent = file_get_contents($_FILES['afile']['tmp_name']);
$myfile = fopen("../"+$fileName, "w") or die("Unable to open file!");
fwrite($myfile, $fileContent);
fclose($myfile);
?>