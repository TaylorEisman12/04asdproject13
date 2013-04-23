// Taylor Eisman
// 04/2013
// main.js

$("#index header a").on('click', function() { 
    alert("Save a list of your Armors.");
 });
 
 
	$( '#remoteData' ).on('pageinit', function(){
		$( '#jsonButton' ).on( 'click', function () {
		$('#viewData').empty();
        $.ajax( {
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success:function ( result ) {
	//console.log(result);
                for ( var i = 0, len = result.armors.length; i < len; i++ ) {
                    var item = result.armors[i];
	console.log(item);
                    $( ' ' +
						'<div class="contentJSON">' +
							'<ul>' +
								'<li>' + '<b>' + item.armorName[0] + " " + item.armorName[1] + '</b>' + '</li>' +
								'<li>' + item.selectColor[0] + " " + item.selectColor[1] + '</li>' +
								'<li>' + item.repaired[0]	+ " " + item.repaired[1] + '</li>' +
							'</ul>' +
						'</div>'
					).appendTo( '#viewData' );
                }
            }
        });
    });

	$( '#xmlButton' ).on( 'click', function() {
		$('#viewData').empty();
			$.ajax( {
				url: 'xhr/data.xml',
				type: 'GET',
				dataType: 'xml',
				success:function ( result ) {
				//console.log(result);
				$(result).find('item').each(function(){
					var armorName = $(this).find('armorName').text();
                    var selectColor = $(this).find('selectColor').text();
                    var repaired = $(this).find('repaired').text();
                        $(' '+
                            '<div class="contentXML">' +
                                '<ul>' +
                                    '<li><b>Armor Name: ' + armorName + '</b></li>' +
                                    '<li> Color: ' + selectColor + '</li>' +
                                    '<li> Repaired: ' + repaired + '</li>' +
                                '</ul>' +
                            '</div>'
						).appendTo('#viewData');
					});
				}
			});
    });


$( '#csvButton' ).on( 'click', function() {
$('#viewData').empty();
        $.ajax( {
            url: 'xhr/data.csv',
            type: 'GET',
            dataType: 'text',
            success:function ( result ) {
			//console.log(result);
			var lines = result.split("\n");
			//console.log(lines);
			var dataRow = lines[0];
			var dataCol = dataRow.split(",");
			for (var lineNum = 1; lineNum < lines.length; lineNum++) {
				var row = lines[lineNum];
				var columns = row.split(",");
				//console.log(columns);
			$(''+
		'<div class="contentCSV">'+
			'<ul>' +
				'<li><b>' + dataCol[0] + " " + columns[0] + '</b></li>' +
				'<li>'+ dataCol[1] + " " + columns[1] + '</li>' +
				'<li>'+ dataCol[2] + " " + columns[2] + '</li>' +
				'<li>'+ dataCol[3] + " " + columns[3] + '</li>' +
			'</ul>' +
		'</div>'
				).appendTo('#viewData');
		}
            }
        });
    });

});
 
 /*
 
 
 $('#submit').on('click', function () {
 	alert('Armor Saved!');
 	
 });
 
 var autofillData = function (){
	 .each(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
};

var getData = function(){
	$("#addArmor").empty();
		if(localStorage.length === 0){
			alert("There is no Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		document.body.appendChild(makeDiv);
		$('#armorList').append(makeDiv);
		$('#items').show();
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul>');
			makeli.append(makeSubList);
			getImage(obj.category[1], makeSubList);
			for(var n in obj){
				var makeSubli = $('<li>');
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.text(optSubText);
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}

};


var storeData = function(data){
	if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();

		var item					= {};
			item.armorName			= ["Armor Name: ", $('#armorName').val()];
			item.armorColor			= ["Color: ", $('#armorColor').val()];
			item.repaired			= ["Repaired: ", $('#repaired').val()];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Armor Saved!");
		save.off("click");
		save.on("click", storeData);
		window.location.reload();

	};
};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this Armor?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Armor was deleted.");
			window.location.reload();
		}else{
			alert("Armor was not deleted.");
		}		
};



var clearLocal = function(){
	if(localStorage.length === 0){
			alert("No data to clear.");
		}else{
			localStorage.clear();
			alert("All Armor is deleted");
			window.location.reload();
			return false;
		}
	}

	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);

};

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 $('#editButton').on('click', function(){ editArmor() });
 $('#deleteButton').on('click', function() { deleteArmor() });
 
 var editPlayer = function() {
	var nKey = $(this).data('key');
	console.log("key:", nKey);
	$.couch.db('armordb').openDoc(nKey, {
		success: function(data){
			console.log(data);
			$('#armorName').val(data.armorName);
			$('#armorColor').val(data.armorColor);
			$('#repaired').val(data.repaired);
			$('#submit').val("Save changes").attr({'key': data._id, 'rev': data._rev}); 
			$.mobile.changePage('#index');
		}
	});
};


var deleteArmor = function(){
	var itemKey = $(this).data('key');
	console.log("Key:", itemKey);
	var ask = confirm("Are you sure you want to delete this Armor?");
		if(ask === true){	
			$.couch.db('armordb').openDoc(myKey, {		
				success: function(data){
					var item = {};
					item._id = data._id;
					item._rev = data._rev;
					$.couch.db('armordb').removeDoc(item, {
						success: function(data){
							alert('The Armor was deleted.');
						},
						error: function() {
		            	alert('The Armor was not deteled');	
		            	}
					});
		};
		$.mobile.changePage('#index');

};


// 																 //

//																 //
//$('#yellowArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/yellowArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "armor.html?armor=" + armorName)
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
//$('#blueArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/blueArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "armor.html?armor=" + armorName)
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
//$('#greenArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/greenArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "armor.html?armor=" + armorName)
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
//$('#redArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/redArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "armor.html?armor=" + armorName)
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
 
 $('#blueArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/blueArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
  $('#yellowArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/yellowArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
   $('#greenArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/greenArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
   $('#redArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/redArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
 $('#index').on('pageinit', function(){
	//code needed for home page goes here
	$('submit').on('click', function(){

		var myForm = $('#addArmor');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	
		var storeData = function(data){
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		
		var item					= {};
			item.armorName			= ["Armor Name: ", $('#armorName').val()];
			item.armorColor			= ["Color: ", $('#armorColor').val()];
			item.repaired		= ["Repaired: ", $('#repaired').val()];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Armor Saved!");
		save.off("click");
		save.on("click", storeData);
		window.location.reload();
	
	});	};
 
	
	//any other code needed for addItem page goes here
	
});
 
//	var urlVars = function () {
//    	var urlData = $($.mobile.activePage).data("url");
//    	var urlParts = urlData.split('?');
//    	var urlPairs = urlParts[1].split('&');
//    	var urlValues = {};
//    	for (var pair in urlPairs) {
//        	var keyValue = urlPairs[pair].split('=');
//        	var key = decodeURIComponet(keyValue[0]);
//        	var value = decodeURIComponet(keyValue[1]);
//        	urlValues[key] = value;    
//    }
//    return urlValues;
//};

 
//	 $('#armor').on("pageinit", '#armor', function() {
//    	var armor = urlVars()["armor"];
//    	console.log(armor);
//  	  $.couch.db("asdproject").view("plugin/armorViews", {
//    	key: "armor=" + armorName
//    });
//});
 */
