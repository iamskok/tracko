export default `
<% columns.forEach((column) => { %>
	<section id="<%= column.id %>" class="Column">
		<h2 class="Column-header"><%= column.title %></h2>
		<% if (column.cards !== undefined && column.cards.length > 0) { %>
			<% column.cards.forEach((card) => { %>
				<div
					id=<%= card.id %>
					class="Card isAnimated"
					data-target="card"
					data-column-id=<%= card.columnId %>
				>
					<h3 class="Card-header"><%= card.title %></h3> 
					<% if (column === columns[0]) { %>
						<div class="Card-buttonContainer">
							<button
								class="Card-button isDisabled"
								data-id=<%= card.id %>
								data-column-id=<%= card.columnId %>
								data-disabled="true"
								data-move="left"
							>
								move left
							</button>

							<button
								class="Card-button"
								data-id=<%= card.id %>
								data-column-id=<%= card.columnId %>
								data-move="right"
							>
								move right
							</button>
						</div>
					<% } else if (column === columns[columns.length - 1]) { %>
						<div class="Card-buttonContainer">
							<button
								class="Card-button"
								data-id=<%= card.id %>
								data-column-id=<%= card.columnId %>
								data-move="left"
							>
								move left
							</button>
							<button
								class="Card-button isDisabled"
								data-id=<%= card.id %>
								data-disabled="true"
								data-column-id=<%= card.columnId %>
								data-move="right"
							>
								move right
							</button>
						</div>
					<% } else { %>
						<div class="Card-buttonContainer">
							<button
								class="Card-button"
								data-id=<%= card.id %>
								data-column-id=<%= card.columnId %>
								data-move="left"
							>
								move left
							</button>
							<button
								class="Card-button"
								data-id=<%= card.id %>
								data-column-id=<%= card.columnId %>
								data-move="right"
							>
								move right
							</button>
						</div>
					<% } %>
				</div>
			<% }); %>
		<% } %>
	</section>
<% }); %>`
