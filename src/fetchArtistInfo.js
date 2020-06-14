const https = require('https');
fs = require('fs');
const token = 'BQDXLqCIRzilN2dZ3okbjdgZPoWHw5t2yEiAvXZa0k6W78nAGF9Yjw53XYl1riay9HeUrkMOgcj90v9ARiDUqfcxtN4o9PMDbtGE6IgDBLJITpTm3A1XvfJNR5BoUQQt1ljD3tO5'
const artistID = '4Kg3vBPMPfnYrnZo2A4czS'

// 0 = artist info, 1 = top tracks, 2 = albums
var i = 0;

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

const makeRequest = function(request, outFile) {
	 const req = https.request(request, (res) => {
		//console.log('statusCode:', res.statusCode);
		//console.log('headers:', res.headers);
		
		let result = "";

		res.on('data', (d) => {
			result += d;
		});
		
		res.on('end', () => {		
			fs.writeFile(outFile, result, function (err) {
				if (err) return console.log(err);
			});
			
		});
	});

	req.on('error', (e) => {
		console.error(e);
	});

	req.end();
}

for(i=0; i<requests.length; i++) {
	makeRequest(requests[i], files[i]);
}
