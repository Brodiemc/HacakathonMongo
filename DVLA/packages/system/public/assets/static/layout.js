
	function load()
	{
	
			
		//var obj = jQuery.parseJSON( data );
		
		if (getParameterByName ( "customerName" ) == "") {
		$.getJSON( "http://localhost:9000/drivers/" + getParameterByName ( "dln" ), function( data2 ) {
			//console.log(data);
			//var obj = jQuery.parseJSON( data );
			
			test ( data2 );
	
			var div = document.getElementById('vehiclediv');
		
			var htmlString = buildVehiclediv ( data2 );

			div.innerHTML = htmlString;
			
			
			
		});
		}
		else {
		$.getJSON( "http://localhost:9000/driversSearch/" + getParameterByName ( "customerName" ), function( data2 ) {
			//console.log(data);
			//var obj = jQuery.parseJSON( data );
			
			test ( data2 );
	
			var div = document.getElementById('vehiclediv');
		
			var htmlString = buildVehiclediv ( data2 );

			div.innerHTML = htmlString;
			
			
			
		});
		}
		
	}
	function test ( data )
	{
		//alert ( data[0] );
		//alert ( data[1] );
		$("#FirstName").text ( data[0].driver.FirstName );
		$("#LastName").text ( data[0].driver.LastName );
		
		if ( data[0].driver.gender == 1 )
		{
			$("#gender").text ( "Male" );
		}
		else
		{
			$("#gender").text ( "Female" );
		}
		
		
		$("#houseNum").text ( data[0].driver.HouseNumber );
		$("#address1").text ( data[0].driver.Address1 );
		$("#town").text ( data[0].driver.Town );
		$("#postcode").text ( data[0].driver.PostCode );
		
	}
	function buildVehiclediv ( obj )
	{
		var items = new Array ( );
		if ( obj[1].vehicle[0] )
		{
			items.push ( buildTopDiv ( obj ) );
			for ( var i = 0; i < obj[1].vehicle.length;i++)
			{
				items.push ( buildVehicleData ( obj,i ) );
				items.push ( buildVehicleTax ( obj,i ) );
				items.push ( buildVehicleDetails ( obj,i ) );
			}
		}
		else
		{
			items.push (buildErrorText());
		}
		return items.join("");
	}
	function buildTopDiv ( obj )
	{
		var items = new Array ( );
		items.push('<h4><div id="circle">222</div> vehicle keeper matches for this driver</h4>');
		items.push('<p>');
		for ( var i = 0; i < obj[1].vehicle.length;i++)
		{
			items.push('<a href="#"><b>&rarr;' + obj[1].vehicle[i].VRM + '   ' +  obj[1].vehicle[i].YearOfManufacture + ' ' + obj[1].vehicle[i].Make + ' ' + obj[1].vehicle[i].Model +'</b></a><br>');
		}
		items.push('</p>');
		return items.join("");
	}
	function buildVehicleData ( obj, i )
	{
		var items = new Array ( );
		//items.push ('<p><img src="img/vehicle-data2.png"/></p>');
			items.push ('<div class="row">');
			items.push ('<div class="col-md-4 reg">' + +obj[1].vehicle[i].VRM + '/div>');
			var tax = Math.floor(Math.random() * 3) + 1;
			var mot = Math.floor(Math.random() * 3) + 1;
			if(tax == 1){
				items.push ('<div class="col-md-4 isValidTax">? Taxed</div>');
			}else if(tax == 2){
				items.push ('<div class="col-md-4 isInvalidTax">? Taxed</div>');
			}else if(tax ==3){
				items.push ('<div class="col-md-4 isSoonTax">! Taxed</div>');
			}
			if(mot == 1){
				items.push ('<div class="col-md-4 isValidMot">? MOT</div>');
			}else if(mot == 2){
				items.push ('<div class="col-md-4 isInvalidMot">? MOT</div>');
			}else if(mot ==3){
				items.push ('<div class="col-md-4 isSoonMot">! MOT</div>');
			}
			items.push ('</div>');	
		return items.join("");
	}
	function buildVehicleTax ( obj, i )
	{
		var items = new Array ( );
		items.push ('<p>');
		items.push ('<table class="table table-striped">');
		items.push ('<tr>');
		items.push ('<td><b>Vehicle excise duty rate for vehicle<b></td>');
		items.push ('<td></td>');
		items.push ('</tr>');
		items.push ('<tr>');
		items.push ('<td>6 Month rate</td>');
		items.push ('<td>£126.50</td>');
		items.push ('</tr>');
		items.push ('<tr>');
		items.push ('<td>12 Month rate</td>');
		items.push ('<td>£230.00</td>');
		items.push ('</tr>');
		items.push ('</table>');
		items.push ('<a href="#"><b>Stop paying tax on this vehicle - File a SORN</b></a>');
		items.push ('</p>');
		return items.join("");
	}
	function buildVehicleDetails ( obj, i )
	{
		var items = new Array ( );
		items.push(' <h2>Vehicle details</h2> ');
		items.push(' <p><table class="table">');
		items.push(' <tr>');
		items.push(' <td>Vehicle make:</td>');
		items.push(' <td><b>'+ obj[1].vehicle[i].Make +'</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Date for registration:</td>');
		items.push(' <td><b>14 September 1992</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Year of manufacture:</td>');
		items.push(' <td><b>'+ obj[1].vehicle[i].YearOfManufacture +'</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Cylinder capacity(cc):</td>');
		items.push(' <td><b>'+obj[1].vehicle[i].EngineCapacity+'cc</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>CO2 Emissions:</td>');
		items.push(' <td><b>Not available</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Fuel type:</td>');
		items.push(' <td><b>'+obj[1].vehicle[i].FuelType+'</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Tax class:</td>');
		items.push(' <td><b>'+obj[1].vehicle[i].TCDescription+'</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Export marker:</td>');
		items.push(' <td><b>No</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Vehicle status:</td>');
		items.push(' <td><b>Tax not due</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Vehicle color:</td>');
		items.push(' <td><b>'+obj[1].vehicle[i].Colour+'</b></td>');
		items.push(' </tr>');
		items.push(' <tr>');
		items.push(' <td>Vehicle type approval:</td>');
		items.push(' <td><b>Not available</b></td>');
		items.push(' </tr>');
		items.push(' </table></p>');
		return items.join("");
	}
	
	function buildErrorText ( )
	{
		var items = new Array ( );
		items.push ( 'We may have found potential matches for cars you own, please enter the VIN number to confirm' );
		items.push ( '<br>' );
		items.push ( '<br>' );
		items.push ( 'VIN: <input type="text"  id="vin"><br>' );
		items.push ( '<br>' );
		items.push ( '<button type="button" onclick="clickButton()">Submit</button>'  );
		items.push ( '<label id="errMsg" style="color:red;"></label>');
		
		return items.join("");
	}
	
	function clickButton ( )
	{
		$.getJSON( "http://localhost:9000/driversLink/" + getParameterByName ( "dln" ) + "/" + $('#vin').val() , function( data3 ) {
			
			if(data3 != "Success"){
				$('#errMsg').text('Sorry no records match your records');
			}else{
							location.reload();
			}
		});
	}
	
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}	
	