export default `
<% columns.forEach((column) => { %>
	<section id="<%= column.id %>" class="Column">
		<h2 class="Column-header"><%= column.title %></h2>
		<% if (column.cards !== undefined && column.cards.length > 0) { %>
			<% column.cards.forEach((card) => { %>
				<div id=<%= card.id %> class="Card isAnimated js-Card">
					<div class="Card-buttonContainer">
						<button class="Card-button">edit</button>
						<button class="Card-button">remove</button>
					</div>
					<h3 class="Card-header"><%= card.title %></h3> 
					<% if (column === columns[0]) { %>
						<div class="Card-buttonContainer">
							<button class="Card-button isDisabled js-Card-button--left"
								 data-id=<%= card.id %>>move left
							</button>

							<button class="Card-button js-Card-button--right" 
								 data-id=<%= card.id %>>move right
							</button>
						</div>
					<% } else if (column === columns[columns.length - 1]) { %>
						<div class="Card-buttonContainer">
							<button class="Card-button js-Card-button--left" 
								 data-id=<%= card.id %>>move left
							</button>
							<button class="Card-button isDisabled js-Card-button--right"
								 data-id=<%= card.id %>>move right
							</button>
						</div>
					<% } else { %>
						<div class="Card-buttonContainer">
							<button class="Card-button js-Card-button--left"
								 data-id=<%= card.id %>>move left
							</button>
							<button class="Card-button js-Card-button--right" 
								 data-id=<%= card.id %>>move right
							</button>
						</div>
					<% } %>
				</div>
			<% }); %>
		<% } %>
		<button class="Column-button">add a task</button>
	</section>
<% }); %>`
