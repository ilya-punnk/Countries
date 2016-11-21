function cntr_request(){
    $.ajax({ 
        url: '/api.php/countries',
        dataType: "json",
        success: load_countries,
        error: onAjaxError,
        cache: false
    });
}
function city_request(){
    $.ajax({ 
        url: '/api.php/countries/'+document.getElementById('cntr_selector').value+'/cities',
        dataType: "json",
        success: load_cities,
        error: onAjaxError,
        cache: false
    });
}

var city_selected;

function cntr_lang_request(){
    city_selected=false;
    $.ajax({ 
        url: '/api.php/countries/'+document.getElementById('cntr_selector').value,
        dataType: "json",
        success: load_used_languages,
        error: onAjaxError,
        cache: false
    });
}

function city_lang_request(){
    city_selected=true;
    $.ajax({ 
        url: '/api.php/countries/'+document.getElementById('cntr_selector').value+'/cities/'+document.getElementById('city_selector').value,
        dataType: "json",
        success: load_used_languages,
        error: onAjaxError,
        cache: false
    });
}

function lang_request(){
    $.ajax({ 
        url: '/api.php/languages/',
        dataType: "json",
        success: load_all_languages,
        error: onAjaxError,
        cache: false
    });
}

var load_used_languages = function(data){
    var table = document.getElementById('used_languages_table');
    table.innerHTML='<tr><td class="left_column">Used languages</td></tr>';
    var i=1;
    for(var key in data) {
        var label = data[key];
        var row = table.insertRow(i++);
        var cell1 = row.insertCell(0); 
        cell1.innerHTML = label;
        if(city_selected){
            var cell2 = row.insertCell(1);
            cell2.innerHTML='<button onclick="delete_language('+key+')">delete</button>';
        }
    }
    if(city_selected){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = '<select id="lang_selector"> <option value="null" selected> </option></select>';
        cell2.innerHTML = '<button id="lang_add" onclick="add_language()">add</button>';
        
        var selector = document.getElementById('lang_selector');
        var j=1;
        for(var key in languages_array){
            if(!(key in data)){
                var label = languages_array[key];
                selector.options[j] = new Option(label, key);
                j++;
            }
        }
    }

};

var load_countries = function(data){
    var cntr_selector = document.getElementById('cntr_selector');
    cntr_selector.selectedIndex=0;
    while(cntr_selector.options.length>1){
        cntr_selector.remove(cntr_selector.options.length-1);
    }
    var i=1;
    for(var key in data) {
        var label = data[key];
        cntr_selector.options[i] = new Option(label, key);
        i++;
    }
};

var load_cities = function(data){ 
    var city_selector = document.getElementById('city_selector');
    city_selector.selectedIndex=0;
    while(city_selector.options.length>1){
        city_selector.remove(city_selector.options.length-1);
    };
    var i=1;
    for(var key in data) {
        var label = data[key];
        city_selector.options[i] = new Option(label, key);
        i++;
    }
};

var languages_array=[];

var load_all_languages = function(data){
    languages_array=[];
    var table = document.getElementById('all_languages_table');
    table.innerHTML='<tr><td>All languages</td></tr><tr><td class="left_column"><input type="text" id="new_lang_name"/></td><td class="btn_column"><button id="crt_lang" onclick="create_lang()">create</button> </td></tr>';
    var i=2;
    for(var key in data) {
        var label = data[key];
        languages_array[key]=label;
        var row = table.insertRow(i++);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = label;
        cell2.innerHTML='<button onclick="rename_language('+key+')">rename</button>';
        cell3.innerHTML='<button onclick="drop_language('+key+')">delete</button>';
    }
};

var onAjaxError = function(xhr, status){
    alert(xhr.status);
};



function cntr_cnanged(){
    var val = document.getElementById('cntr_selector').value;
    if(val=='null'){
        document.getElementById('city_table').style.display='none';
        document.getElementById('cntr_dlt').disabled=true;
        document.getElementById('cntr_rnm').disabled=true;
        document.getElementById('used_languages_table').style.display='none';
    }  else{
        document.getElementById('city_table').style.display='inline';
        document.getElementById('cntr_dlt').disabled=false;
        document.getElementById('cntr_rnm').disabled=false;
        document.getElementById('used_languages_table').style.display='inline';
        city_request();
        document.getElementById('city_dlt').disabled=true;
        document.getElementById('city_rnm').disabled=true;
        cntr_lang_request();
    }
}

function city_cnanged(){
    var val = document.getElementById('city_selector').value;
    if(val=='null'){
        document.getElementById('city_dlt').disabled=true;
        document.getElementById('city_rnm').disabled=true;
        cntr_lang_request();
    } else{
        document.getElementById('city_dlt').disabled=false;
        document.getElementById('city_rnm').disabled=false;
        city_lang_request();
    }
}

function add_country(){
    var name = document.getElementById('cntr_name').value;
    document.getElementById('cntr_name').value='';
    $.ajax({ 
        url: '/api.php/countries/',
        dataType: "json",
        type: 'POST',
        data: name,
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                cntr_request();
                cntr_cnanged();
            }  
        },
        cache: false
    });
}

function add_city(){
    var name = document.getElementById('city_name').value;
    var country_id= document.getElementById('cntr_selector').value;
    document.getElementById('city_name').value='';
    
    $.ajax({ 
        url: '/api.php/countries/'+country_id+'/cities',
        dataType: "json",
        type: 'POST',
        data: name,
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                city_request();
                cntr_cnanged();
            }
        },
        cache: false
    });
}

function add_language(){
    var lang_id = document.getElementById('lang_selector').value;
    if(lang_id=='null'){
        return;
    }
    var city_id= document.getElementById('city_selector').value;
    document.getElementById('lang_selector').value='null';
    $.ajax({ 
        url: '/api.php/cities/'+city_id+'/languages/'+lang_id,
        dataType: "json",
        type: 'PUT',
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                city_cnanged();
            }
        },
        cache: false
    });
}

function create_lang(){
    var name = document.getElementById('new_lang_name').value;
    document.getElementById('new_lang_name').value='';
    $.ajax({ 
        url: '/api.php/languages',
        dataType: "json",
        type: 'POST',
        data: name,
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                lang_request();
                if(document.getElementById('cntr_selector').value!='null'){
                    if(city_selected){
                        city_lang_request();
                    } else{
                        cntr_lang_request();
                    }
                }
            }
        },
        cache: false
    });
}

function delete_cntr(){
    var id = document.getElementById('cntr_selector').value;
    document.getElementById('cntr_selector').value='null';
    $.ajax({ 
        url: '/api.php/countries/'+id,
        dataType: "json",
        type: 'DELETE',
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                cntr_request();
                cntr_cnanged();
            }
        },
        cache: false
    });
}

function delete_city(){
    var id = document.getElementById('city_selector').value;
    document.getElementById('city_selector').value='null';
    $.ajax({ 
        url: '/api.php/cities/'+id,
        dataType: "json",
        type: 'DELETE',
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                city_request();
                cntr_cnanged();
            }
        },
        cache: false
    });
}

function delete_language(id){
    var city_id = document.getElementById('city_selector').value;
    $.ajax({ 
        url: '/api.php/cities/'+city_id+'/languages/'+id,
        dataType: "json",
        type: 'DELETE',
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                city_cnanged();
            }
        },
        cache: false
    });
}

function drop_language(id){
    $.ajax({ 
        url: '/api.php/languages/'+id,
        dataType: "json",
        type: 'DELETE',
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                document.getElementById('cntr_selector').value='null';
                document.getElementById('city_selector').value='null';
                lang_request();
                cntr_request();
                cntr_cnanged();
            }
        },
        cache: false
    });
}

function rename_cntr(){
    var selector = document.getElementById('cntr_selector');
    var id= selector.value;
    var name = selector.options[selector.selectedIndex].innerHTML;
    var result = prompt('Enter new name for '+name, name);
    if(result==null) return;
    $.ajax({ 
        url: '/api.php/countries/'+id,
        dataType: "json",
        type: 'PUT',
        data: result,
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                selector.options[selector.selectedIndex].innerHTML=result;
            }
        },
        cache: false
    });
}

function rename_city(){
    var selector = document.getElementById('city_selector');
    var id= selector.value;
    var name = selector.options[selector.selectedIndex].innerHTML;
    var result = prompt('Enter new name for '+name, name);
    if(result==null) return;
    $.ajax({ 
        url: '/api.php/cities/'+id,
        dataType: "json",
        type: 'PUT',
        data: result,
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                selector.options[selector.selectedIndex].innerHTML=result;
            }
        },
        cache: false
    });
}

function rename_language(id){
    var name = languages_array[id];
    var result = prompt('Enter new name for '+name, name);
    if(result==null) return;
    $.ajax({ 
        url: '/api.php/languages/'+id,
        dataType: "json",
        type: 'PUT',
        data: result,
        complete: function(jqXHR, textStatus){
            if(jqXHR.status!='200'){
                alert(jqXHR.status);
                location.reload();
            } else{
                languages_array[id]=result;
                lang_request();
                city_cnanged();
            }
        },
        cache: false
    });
}

lang_request();
cntr_request();
cntr_cnanged();