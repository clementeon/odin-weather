async function getData(city) {
	try {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=SJ6KMSJYPPHCQRU427G3CDX28`,
		);
		const data = await response.json();
		const days = new Map();
		data.days.slice(1, 8).forEach((element) => {
			days.set(convertDate(element.datetime), getDayData(element));
		});
		const appData = {
			address: data.resolvedAddress,
			today: getDayData(data.days[0]),
			daysData: days,
		};
		return appData;
	} catch (error) {
		console.log(error);
	}
}

function celciusToFarenheit(temp) {
	return Math.round(((temp * 9) / 5 + 32) * 10) / 10;
}

function farenheitToCelcius(temp) {
	return Math.round((((temp - 32) * 5) / 9) * 10) / 10;
}

function convertDate(string) {
	const dayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const date = new Date(string);
	const day = date.getDay();
	return dayNames[day];
}

function getDayData(day) {
	const dayData = {
		date: convertDate(day.datetime),
		description: day.conditions,
		temp: day.temp,
		tempmax: day.tempmax,
		tempmin: day.tempmin,
		feelslike: day.feelslike,
		icon: day.icon,
	};
	return dayData;
}

export { getData, celciusToFarenheit, farenheitToCelcius };
