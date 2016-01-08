var office_sales = '';
var locations = { 
	"Dallas": {lat: 32.8203525, lng: -96.8714525}, 
	"Fort Worth": {lat: 32.7511755, lng: -97.3312415},
	"Atlanta": {lat: 33.7486523, lng: -84.3902076},
	"Austin": {lat: 30.2615095, lng: -97.8200443},
	"Denton": {lat: 32.9544952, lng: -96.9590797},
	"Houston Central": {lat: 29.7552847, lng: -95.383594},
	"Philadelphia": {lat: 39.9519665, lng: -75.1695827},
	"San Antonio": {lat: 29.4241866, lng: -98.5043151},
	"St. Petersburg": {lat: 27.7786988, lng: -82.6898492},
	"Los Angeles": {lat: 34.0500547, lng: -118.2438843}
};
var map;

$(function() {
	$.getJSON('properties.json', function(properties) {

		// parse data
		office_sales = _.groupBy(properties, function(d) { return d.office_name });
		console.log(office_sales);

		// populate the office selection
		var $select = $('#office');
		var offices = _.map(office_sales, function(v, k) { return k; });
		$.each(offices, function(k, v) { $select.append('<option value="' + v + '">' + v + '</option>'); });

		// setup select change handler
		$("#office").change(function() { selectOffice($("#office").val()) });

		map = new google.maps.Map(document.getElementById('map'), {
		//	center: locations[office],
			zoom: 10
		});

		// default office
		selectOffice("Dallas");
	});
});

function selectOffice(office) {
	console.log("show office: " + office)
	map.setCenter(locations[office]);
	$('#office').val(office);
	$('#info').text(office_sales[office].length + " properties");

	// clear all existing markers
	_(office_sales).chain().map(function(k, v) { return k }).flatten().each(function(a) { if (a.marker) a.marker.setMap(null); });

	// process each property
	for (i = 0; i < office_sales[office].length; i++)
	{
		// add new markers if they don't exist
		var prop = office_sales[office][i];
		if (prop.marker == null) {
			pos = {lat: Number(prop.latitude), lng: Number(prop.longitude)};
			prop.marker = new google.maps.Marker({
				position: pos,
				title: prop.streetnum + " " + prop.streetname + ", " + prop.zipcode
			});
		}

		// add property to map
		prop.marker.setMap(map);
	}
}