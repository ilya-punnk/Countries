<!DOCTYPE html>
<html>
    <head>
        <title>Countries</title>
        <style>
            #general_table {
                width: 100%; /* Ширина таблицы */
            }
            td {
                padding: 5px; /* Поля в ячейках */
                vertical-align: top; /* Выравнивание по верхнему краю ячеек */
            }
            select{
                width: 100%;
            }
            .left_column{
                width: 200px;
            }
            .btn_column{
                width: 70px;
            }
            input{
                width: 95%;
            }
            button{
                width: 100%;
            }
            #city_container{
                height: 80px;
            }
            #cntr_container{
                height: 80px;
            }
        </style>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    </head>
	<body>
            <table id='general_table'>
            <tr>
                <td>
                <div id = 'cntr_container'>
                    <table>
                        <tr>
                            <td class="left_column">
                                <select id="cntr_selector" onchange = "cntr_cnanged()">
                                    <option value="null" selected> </option>
                                </select>
                            </td>
                            <td class="btn_column">
                                <button id="cntr_dlt" onclick="delete_cntr()" disabled="">delete</button>
                            </td>
                            <td class="btn_column">
                                <button id="cntr_rnm" onclick="rename_cntr()"disabled="">rename</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="left_column">
                                <input type="text" id="cntr_name"/> 
                            </td>
                            <td class="btn_column">
                                <button id="cntr_add" onclick="add_country()">add</button>
                            </td>
                            <td class="btn_column">
                                <button id="cntr_ok" style="display: none;">ok</button>
                            </td>
                        </tr>
                    </table>
                </div>

                <br/>

                <div id = 'city_container'>
                    <table id="city_table" style="display: none;">
                        <tr>
                            <td class="left_column">
                                <select id="city_selector" onchange="city_cnanged()">
                                    <option value="null" selected> </option>
                                </select>
                            </td>
                            <td class="btn_column">
                                <button id="city_dlt" onclick="delete_city()" class="select_dependent">delete</button>
                            </td>
                            <td class="btn_column">
                                <button id="city_rnm" onclick="rename_city()" class="select_dependent">rename</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="left_column">
                                <input type="text" id="city_name"/> 
                            </td>
                            <td class="btn_column">
                                <button id="city_add" onclick="add_city()">add</button>
                            </td>
                            <td class="btn_column">
                                <button id="city_ok" style="display: none;">ok</button>
                            </td>
                        </tr>
                    </table>
                </div>

                <br/>

                <table id="used_languages_table" border="0" style="display: none;">
                    <tr>
                        <td>
                        Used languages
                        </td>
                    </tr>
                    <tr>
                        <td class="left_column">
                             <select id="lang_selector">
                                    <option value="null" selected> </option>
                                </select>
                        </td>
                        <td class="btn_column">
                            <button id="lang_add" onclick='add_language()'>add</button>
                        </td>    
                    </tr>
                </table>
                </td>
                <td>
                    <table id="all_languages_table" border="0">
                        <tr>
                            <td>All languages</td>
                        </tr>
                        <tr>
                            <td class="left_column">
                                <input type="text" id="new_lang_name"/> 
                            </td>
                            <td class="btn_column">
                                <button id="crt_lang">create</button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            </table>
            <script src="/script.js"></script>
	</body>
</html>
