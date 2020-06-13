const https = require('https');
fs = require('fs');
const token = 'BQAzGkehCUzz6xKRJjrlt3FXmdfpP_7pe6BjianmmL3IAjQhrxtJAHhyK6ZbqbBEJoiBFM6bMxRWbO61q-0IR2K3wa__jOdAe3mfuO0CZtTTo_Jl0vtJ82MXxJ0BWGjIYKJepuwj'
const artistID = '1S2S00lgLYLGHWA44qGEUs'

// 0 = artist info, 1 = top tracks, 2 = albums
var i = 2;

const artistInfo = {
	hostname: 'api.spotify.com',
	path: '/v1/artists/'.concat(artistID),
	method: 'GET',
	headers: {
		'Authorization': 'Bearer '.concat(token)
	}
};

const topTracks = {
	hostname: 'api.spotify.com',
	path: '/v1/artists/'.concat(artistID).concat('/top-tracks?country=US'),
	method: 'GET',
	headers: {
		'Authorization': 'Bearer '.concat(token),
	}
};

const albums = {
	hostname: 'api.spotify.com',
	path: '/v1/artists/'.concat(artistID).concat('/albums?market=US'),
	method: 'GET',
	headers: {
		'Authorization': 'Bearer '.concat(token),
	}
};

const requests = [artistInfo, topTracks, albums];
var files = ["json/artistInfo.json", "json/topTracks.json", "json/albums.json"];

//for (i=0; i<requests.length; i++) {	
	 const req = https.request(requests[i], (res) => {
		//console.log('statusCode:', res.statusCode);
		//console.log('headers:', res.headers);
		
		let result = "";
		console.log(i,files[i]);

		res.on('data', (d) => {
			result += d;
		});
		
		res.on('end', () => {		
			fs.writeFile(files[i], result, function (err) {
				if (err) return console.log(err);
				console.log('Written to file');
			});
			
		});
	});

	req.on('error', (e) => {
		console.error(e);
	});

	req.end();
//}
