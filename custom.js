const rp = require('request-promise');

function custom(options) {
	options = options || {};
	let verbose = options.verbose || false;

	return async function custom(ctx, next) {
		// const clientIP = ctx.ip;
		const clientIP = '65.93.101.180';
		const ipBody = await rp('http://ip-api.com/json/' + clientIP);
		const { lat, lon } = JSON.parse(ipBody);
		ctx.lat = lat;
		ctx.lon = lon;

		const weatherBody = await getWeather(lat, lon);
		const { weather, main } = weatherBody;
		ctx.weather = weather[0].description;
		ctx.temp = main.temp + 273.15;

		if (verbose) {
			ctx.tempMin = main.temp_min;
			ctx.tempMax = main.temp_max;
			ctx.humidity = main.humidity;
		}
		await next();
	};
}

async function getWeather(lat, lon) {
	let options = {
		uri: 'http://api.openweathermap.org/data/2.5/weather',
		qs: {
			lat: lat,
			lon: lon,
			appid: '6fe277facefdf660aa502877af2dd6fb',
		},
		json: true
	}
	return rp(options);
}

module.exports = custom;
