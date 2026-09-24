import { getData, celciusToFarenheit, farenheitToCelcius } from "./data.js";
import { viewDays, viewToday, convertTemp } from "./view.js";

export default function getCity() {
	const search = document.getElementById("location");
	if (!search) {
		return false;
	}

	window.addEventListener("load", () => {
		loadDay("toronto, canada");
	});
	
	search.addEventListener("submit", async (event) => {
		event.preventDefault();
		const place = document.getElementById("place").value;
		if (!place) {
			return;
		}
		loadDay(place);
	});
}

async function loadDay(place) {
	const data = await getData(place);
		const today = document.getElementById("today");

		//array of days and their info
		dayUpdate([...data.daysData]);
		viewToday(data.address, data.today, today);
		return data;
}

function toggleTemp() {
	const toggle = document.querySelector(".toggle");
	toggle.addEventListener("change", () => {
		if (toggle.id == "celcius") {
			convertTemp(celciusToFarenheit);
			toggle.id = "farenheit";
		} else {
			convertTemp(farenheitToCelcius);
			toggle.id = "celcius";
		}
	});
}

function dayUpdate(dayData) {
	const days = document.querySelectorAll(".weather");
	days.forEach((element, index) => {
		viewDays(dayData[index], element);
	});
}

export { toggleTemp };
