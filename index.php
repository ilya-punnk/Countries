<!DOCTYPE html>
<html>
	<head>
		<title>Countries</title>
		<style>
			.lselect {
				width:100%;
			}
		</style>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	</head>
	<body>
		<table>
			<tr>
				<td>
					<select id="ajax-countries" onchange = "load_cities()" class="lselect"></select>
				</td>
				<td>
					<button id="cntr_upd_btn" disabled>update</button> <button id="cntr_dlt_btn" disabled>delete</button>
				</td>
				<td>
					<select id="ajax-cities" onchange = "load_languages()" class="lselect"></select>
				</td>
				<td>
					<button id="ct_upd_btn"disabled>update</button> <button id="ct_dlt_btn"disabled>delete</button>
				</td>
			</tr>
			<tr>
				<td>
					<input type="text" id="country_name" ></input>
				</td>
				<td>
					<button id="cntr_add_btn">add</button>
				</td>
				<td>
					<input type="text" id="city_name" ></input>
				</td>
				<td>
					<button id="ct_add_btn" disabled>add</button>
				</td>
			</tr>
		</table>
		<br/>
		<table id="languages_table" border="1"></table>
		<script src="/script.js"></script>
	</body>
</html>
