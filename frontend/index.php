<!doctype html>
<html>
	<head>
		<title>Chat!</title>
	
		<link rel="stylesheet" href="round.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
		<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
		<meta charset="utf-8">
	</head>	
	
	
	<div style="width:80%;height:200px;border:1px solid #000;" id="messageBox" class="messageBox">
		

	
	</div>
	
	<form id="mess" name="mess" method="post" onsumbit="return false">
		<textarea id="newMess" name="newMess"></textarea>

		<input type="button" value="send" onclick="send()">
		
	</form>
	
	<script>
	// yava skript
		
	function send(){
		alert(document.getElementById("newMess").value);
		var info = {
			'message': document.getElementById("newMess").value
		}
		
		$.ajax({
			url: 'add.php',
			method: 'post',
			dataType: 'json',
			data: info,
			success: function(back){
				$( "<p> "+info['message']+"</p>" ).appendTo(".messageBox");
			}
		})
		
	}
	
		
	function get(){
		var info = {
			'message': document.getElementById("newMess").value
		}
		
		$.ajax({
			url: 'give.php',
			method: 'post',
			dataType: 'json',
			data: info,
			success: function(messages){
				messages.forEach(el =>{
					
					$( "<p>"+el.time+" "+el.text+"</p>" ).appendTo(".messageBox");
					
				})
			}
		})
		
	}
		get();
		
	</script>

</html>