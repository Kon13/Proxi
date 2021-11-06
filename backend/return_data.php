
<?php
error_reporting(0);
header("Content-Type: application/json; charset=utf-8");

 $out = [];

register_shutdown_function(function() { 
 global $out; 
 echo json_encode($out); 
 
 switch (json_last_error()) { 
        case JSON_ERROR_NONE: 
            #echo ' - Ошибок нет'; 
        break; 
        case JSON_ERROR_DEPTH: 
            echo ' - Достигнута максимальная глубина стека'; 
        break; 
        case JSON_ERROR_STATE_MISMATCH: 
            echo ' - Некорректные разряды или несоответствие режимов'; 
        break; 
        case JSON_ERROR_CTRL_CHAR: 
            echo ' - Некорректный управляющий символ'; 
        break; 
        case JSON_ERROR_SYNTAX: 
            echo ' - Синтаксическая ошибка, некорректный JSON'; 
        break; 
        case JSON_ERROR_UTF8: 
            echo ' - Некорректные символы UTF-8, возможно неверно закодирован'; 
        break; 
        default: 
            echo ' - Неизвестная ошибка'; 
        break; 
    } 
});


	$newmess = substr(htmlentities($_POST['message']),0, 256);
	// $lat = floatval($_POST['lat']);
	// $lon = floatval($_POST['lon']);
	// $ip = ip2long($_SERVER['REMOTE_ADDR']);
	// $ua = $_SERVER['HTTP_USER_AGENT'];
	// error_log("lat: ".$lat."mess: ".$newmess."    ", 3, "my-errors.log");
	
	$servername = "localhost";
	$username = "h66ax52dycn3";
	$password = "Agdh@74hd1";
	$dbname = "ProxiChatDB";
            
	

	$conn = new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset('utf8mb4');
	
	if ($conn->connect_error) {
	  error_log("connection failed", 3, "my-errors.log");	 

	 die("Connection failed: " . $conn->connect_error);

	}

			
	$sql = "SELECT time, text FROM messages";
	$result = mysqli_query($conn, $sql);
		
		if ($result-> num_rows > 0) {
		while ($row = $result->fetch_assoc()) {

			
			$out[] =$row;
		}
		
		}

		$conn->close();	
	
?>