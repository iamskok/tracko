export default {
	columns: [
		{
			id: 'to-do',
			title: 'To Do',
			button: 'add a task',
			cards: [
				{
					id: 0,
					title: 'Add project boilerplate with Sass, ES6, webpack, etc',
					time: '1 day'
				},
				{
					id: 1,
					title: 'Add Tracko board markup',
					time: '2 hours'
				}
			]
		},
		{
			id: 'reopen',
			title: 'Reopen',
			button: 'add a task',
			cards: [
				{
					id: 2,
					title: 'Add project boilerplate',
					time: '2 days'
				}
			]
		},
		{
			id: 'ready-for-testing',
			title: 'Ready for testing',
			button: 'add a task',
		},
		{
			id: 'done',
			title: 'Done',
			button: 'add a task',
			cards: [
				{
					id: 3,
					title: 'Create project idea'
				}
			]
		}
	]
};
