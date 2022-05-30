<?php
$a = file_get_contents('../user_data/times.txt');
$b = (int) $a;
$b=$b+1;
$myfile = fopen("../user_data/times.txt", "w") or die("Unable to open file!");
fwrite($myfile, $b);
fclose($myfile);
echo "var web_times="."'$b';"; 
?>