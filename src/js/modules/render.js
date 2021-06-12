
const Render = {
	init() {
		this.els = {
			head: window.find("content > .head > div"),
			body: window.find("content > .body > .wrapper"),
		};
	},
	workbook(book) {
		// save reference to book
		this.book = book;
		// console.log(book);

		// render sheet names
		let str = [];
		book.SheetNames.map((name, i) => {
			let cn = i === 0 ? 'class="active"' : "";
			str.push(`<span ${cn}>${name}</span>`);
		});
		this.els.head.html(str.join(""));

		// render sheet table
		this.sheet(book.SheetNames[0]);

		// temporary
		this.els.body.find("td:nth(28)").trigger("click");
	},
	sheet(name) {
		// render sheet table
		let sheet = this.book.Sheets[name],
			str = XLSX.utils.sheet_to_html(sheet);

		str = str.match(/<table>.*?<\/table>/gm)[0];
		str = str.replace(/<table>/, `<table class="sheet">`);

		// remove existing sheet
		this.els.body.find("table.sheet").remove();
		// append new sheet
		this.els.body.append(str);
		// hide tools
		Cursor.dispatch({ type: "blur-table" });
	}
};
