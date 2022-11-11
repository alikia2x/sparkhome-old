<?php
//已被弃用
    header("Content-Type: text/html;charset=utf-8");
    $servername = "127.0.0.1:3306";
    $username = "website";
    $server_password = "";
    
     
    $url=urldecode(base64_decode($_GET['url']));
    $keyword=urldecode(base64_decode($_GET['keyword']));
    $name=urldecode(base64_decode($_GET['name']));
    $pwd=$_GET["pwd"];
    if(hash("sha256",$pwd)!="")
    {
        die("Error:Password");
    }
    else{
        // 创建连接
        $conn = mysqli_connect($servername, $username, $server_password);
        // Check connection
        if (!$conn) {
            die("Failed:Connection:" . mysqli_connect_error());
        }
        else{
            echo "Success:Connected";
        }
        
        echo "\n";
        
        $sql = "SELECT * FROM `website`.`official` WHERE `url` LIKE '$url'";
        $result = mysqli_query($conn, $sql);
        if (!$result){
            die("Failed:Search:" . mysqli_connect_error());
        }
        if(mysqli_num_rows($result)<1){
            $sql="INSERT INTO `website`.`official` (`url`, `keyword`, `name`, `add_time`) VALUES ('$url', '$keyword', '$name', CURRENT_TIMESTAMP)";
            $result=mysqli_query($conn,$sql); 
            if($result==true)
            {
                echo "Success:Add\n";
                echo "URL:".$url;
                echo "\n";
                echo "keyword:".$keyword;
                echo "\n";
                echo "name:".$name;
            }
            else{
                echo "Failed:Add";
            }
        }
        else{
            echo "Error:URL added";
        }
        mysqli_close($conn); //最后关闭数据库连接
    }
    
?>