
const numbers = {
	init() {
		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init());
	},
	async dispatch(event) {
		let Self = numbers,
			pEl,
			name;
		switch (event.type) {
			// system events
			case "window.open":
				// temp
				window.find("table.sheet td").get(13).trigger("click");
				break;
			case "window.close":
				break;
			case "window.keystroke":
				break;
			// custom events
			case "toggle-sidebar":
				break;
			// forwards events
			default:
				if (event.el) {
					pEl = event.el.parents("[data-area]");
					name = pEl.data("area");
					if (pEl.length && Self[name].dispatch) {
						Self[name].dispatch(event);
					}
				}
		}
	},
	sidebar: defiant.require("modules/sidebar.js"),
	content: defiant.require("modules/content.js"),
};

window.exports = numbers;
