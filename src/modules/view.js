function viewDays(dayData, div) {
	const elements = div.children;
	elements[0].innerText = dayData[0];
	elements[1].innerText = `${dayData[1].temp}°`;
	getWeatherIcon(dayData[1].icon, elements[2]);
	elements[3].innerText = dayData[1].description;
	elements[4].innerText = `H ${dayData[1].tempmax}° L ${dayData[1].tempmin}°`;
}
function viewToday(address, dayData, div) {
	console.log(dayData);
	const elements = div.children;
	console.log(elements);
	elements[0].innerText = address;
	getWeatherIcon(dayData.icon, elements[1]);
	elements[2].innerText = `${dayData.temp}°`;
	elements[3].innerText = `${dayData.tempmax}°/${dayData.tempmin}° Feels like ${dayData.feelslike}°`;
	elements[4].innerText = `${dayData.description}`;
}

async function getWeatherIcon(iconName, weatherImage) {
	const icon = await import(`../public/weather-icons/${iconName}.svg`);

	weatherImage.src = icon.default;
}

function convertTemp(tempFunc) {
	const temperature = document.querySelectorAll(".temperature");
	const condition = document.getElementById("stats-today");
	const minMax = document.querySelectorAll(".min-max");
	
	temperature.forEach((element) => {
		const num = getNumbers(element.innerText);
		element.innerText = `${tempFunc(num[0])}°`;
	});

	const num = getNumbers(condition.innerText);

	//Format: NUM°/NUM° Feels like NUM°
	condition.innerText = `${tempFunc(num[0])}°/${tempFunc(num[1])}° Feels like ${tempFunc(num[2])}°`;

	minMax.forEach((element) => {
		//Format: H NUM° L NUM°
		const temp = getNumbers(element.innerText);
		element.innerHTML = `H ${tempFunc(temp[0])}° L ${tempFunc(temp[1])}°`;
	});
}

function getNumbers(string) {
	const nums = string.match(/\d+(?:.\d+)?/g);
	return nums;
}
export { viewDays, viewToday, convertTemp };
