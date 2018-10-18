import _ from 'underscore';

export default class Renderer {
	render(state) {
		const jsBoardBody = document.querySelector('.js-Board-body');

		// Append all columns inside `.js-Board-body`
		jsBoardBody.innerHTML = _.template(
			// Loop over every column
			"<% columns.forEach((column) => { %>" +
				"<section id='<%= column.id %>' class='Column'>" +
					"<h2 class='Column-header'><%= column.title %></h2>" +
					// Check if there are any cards in a column
					"<% if (column.cards !== undefined && column.cards.length > 0) { %>" +
						// Loop over every card in a column
						"<% column.cards.forEach((card) => { %>" +
							"<div class='Card'>" +
								"<div class='Card-buttonContainer'>" +
									"<button class='Card-button'>edit</button>" +
									"<button class='Card-button'>remove</button>" +
								"</div>" +
								"<h3 class='Card-header'><%= card.title %></h3>" + 
								"<span class='Card-time'><%= card.time %></span>" +
								// Disable left button for the first column
								"<% if (column === columns[0]) { %>" +
									"<div class='Card-buttonContainer js-Card-buttonContainer--shift'>" +
										"<button class='Card-button isDisabled js-Card-button-isDisabled'>move left</button>" +
										"<button class='Card-button'>move right</button>" +
									"</div>" +
								// Disable right button for the last column
								"<% } else if (column === columns[columns.length - 1]) { %>" +
									"<div class='Card-buttonContainer js-Card-buttonContainer--shift'>" +
										"<button class='Card-button'>move left</button>" +
										"<button class='Card-button isDisabled js-Card-button-isDisabled'>move right</button>" +
									"</div>" +
								// Output all buttons for the the rest of the columns
								"<% } else { %>" +
									"<div class='Card-buttonContainer js-Card-buttonContainer--shift'>" +
										"<button class='Card-button'>move left</button>" +
										"<button class='Card-button'>move right</button>" +
									"</div>" +
								"<% } %>" +
							"</div>" +
						"<% }); %>" +
					"<% } %>" +
					// Check if button exists
					"<% if (column.button) { %>" +
						"<button class='Column-button'><%= column.button %></button>" +
					"<% } %>" +
				"</section>" +
			"<% }); %>"
		)(state);
	}
}
