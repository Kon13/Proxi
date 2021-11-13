function upload(){
		alert(document.getElementById("newMess").value);
		var info = {
			'message': document.getElementById("newMess").value
		}
		
		$.ajax({
			url: 'backend/add_text.php',
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
			url: 'return_data.php',
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
		