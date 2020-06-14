export default function fetchArtistInfo(artistID) {
	const https = require('https');
	//const artistID = '4Kg3vBPMPfnYrnZo2A4czS'
	
	const token = 'BQCFTb4pA0Ob11wXh_Wf1rvwCS7G_VWOUdPk_IBTit9F3WbnhI1DyCvBkl2eycr45uisR_4yNB2bzRGJIspqXK5hd86ifxAhCfB_oQdnlOCrFPCNiyDrQdZz7VW47HwkOtRCdwMn'

	// 0 = artist info, 1 = top tracks, 2 = albums
	let i = 0;

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
	//const files = ["json/artistInfo.json", "json/topTracks.json", "json/albums.json"];

	const makeRequest = function(request, callback) {

		const req = https.request(request, (res) => {
			//console.log('statusCode:', res.statusCode);
			//console.log('headers:', res.headers);

			let result = "";

			res.on('data', (d) => {
				result += d;
			});

			res.on('end', () => {		
				callback(result);
			});
		});

		req.on('error', (e) => {
			console.error(e);
		});

		req.end();
	}

	
	
	makeRequest(requests[0], function(xxx) {
		return xxx;
	});
	
	/*
	for (i=0; i<requests.length; i++) {
		makeRequest(requests[i]);
	}
	*/
}