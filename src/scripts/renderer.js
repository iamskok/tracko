import _ from 'underscore';

export default class Renderer {
	render(state) {
		const boardBody = document.getElementsByClassName('Board-body')[0];

		// Append all columns inside `.Board-body`
		boardBody.innerHTML = _.template(
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
								"<div class='Card-buttonContainer'>" +
									"<button class='Card-button isDisabled'>move left</button>" +
									"<button class='Card-button'>move right</button>" +
								"</div>" +
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
