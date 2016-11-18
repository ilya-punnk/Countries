			countries_loader = ajaxSelect("ajax-countries");
			cities_loader = ajaxSelect("ajax-cities");
			countries_loader.load("http://localhost/api.php/Countries")
			
			function load_cities(){
				clear_table("languages_table");
				document.getElementById("ajax-cities").options.length = 0;
				var country_id = document.getElementById("ajax-countries").value;
				if(country_id!='null'){
					var reques_str = "http://localhost/api.php/Countries/"+country_id+"/Cities";
					cities_loader.load(reques_str);
					document.getElementById("cntr_upd_btn").disabled=false;
					document.getElementById("cntr_dlt_btn").disabled=false;
					document.getElementById("ct_add_btn").disabled=false;
				}
				else{
					document.getElementById("cntr_upd_btn").disabled=true;
					document.getElementById("cntr_dlt_btn").disabled=true;
					document.getElementById("ct_add_btn").disabled=true;
				}
				document.getElementById("ct_upd_btn").disabled=true;
				document.getElementById("ct_dlt_btn").disabled=true;
					
			}
			
			function load_languages(){
					clear_table("languages_table");
					var city_id=document.getElementById("ajax-cities").value;
					var country_id = document.getElementById("ajax-countries").value;
					if(city_id!='null'){
							document.getElementById("ct_upd_btn").disabled=false;
							document.getElementById("ct_dlt_btn").disabled=false;
							var reques_str = "http://localhost/api.php/Countries/"+country_id+"/Cities/"+city_id+"/Languages"
							$.ajax({ 
							url: reques_str,
							dataType: "json",
							success: fill_table,
							cache: false
						})
					} else{
							document.getElementById("ct_upd_btn").disabled=true;
							document.getElementById("ct_dlt_btn").disabled=true;
					}
				
			}
			
			function fill_table(data){
				table=document.getElementById("languages_table");
				if(data!='null'){
					var i=0
					var row = table.insertRow(i++);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerHTML = "<b>id</b>";
					cell2.innerHTML = "<b>Language</b>";
						for(var key in data) {
							var label = data[key]
							var row = table.insertRow(i++);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							cell1.innerHTML = key;
							cell2.innerHTML = label;
							cell3.innerHTML="<button>update</button>";
							cell4.innerHTML="<button>delete</button>"
						}
					var row = table.insertRow(i++);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);
					cell2.innerHTML="<input type=text></input>"
					cell3.innerHTML="<button>add</button>"
				}
			}
			
			function clear_table(tableID){
				var Parent = document.getElementById(tableID);
				while(Parent.hasChildNodes())
				{
				   Parent.removeChild(Parent.firstChild);
				}
			}
			
			function ajaxSelect(id) {
				var element = document.getElementById(id)
				
				var onLoaded = function(data) {
						element.options[0] = new Option(" ", null)
						var i=1
						for(var key in data) {
							var label = data[key]
							element.options[i] = new Option(label, key)
							i++
						}
				}
				
				var onLoadError = function(error) {
					var msg = "Ошибка "+error.errcode
					if (error.message) msg = msg + ' :'+error.message
					alert(msg)
				}
				
				var showLoading = function(on) {
					element.disabled = on
				}

				var onSuccess = function(data) {
					if (!data.errcode) {
						onLoaded(data)
						showLoading(false)        
					} else {
						showLoading(false)
						onLoadError(data)            
					}
				}
				
				
				var onAjaxError = function(xhr, status){
					showLoading(false)
					var errinfo = { errcode: status }
					if (xhr.status != 200) {
						errinfo.message = xhr.statusText
					} else {
						errinfo.message = 'Некорректные данные с сервера'
					}
					onLoadError(errinfo)
				}

				
				return {
					load: function(url) {
						showLoading(true)

						while (element.firstChild) {
							element.removeChild(element.firstChild)
						}

						$.ajax({ 
							url: url,
							dataType: "json",
							success: onSuccess,
							error: onAjaxError,
							cache: false
						})
					}
				}
			}
