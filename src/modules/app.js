import getCity from "./event.js";
import { toggleTemp } from "./event.js";

export default function startApp() {
	getCity();
	toggleTemp();
}