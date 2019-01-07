import columns from '../columns';

export default class ColumnService {
	constructor() {
		if (!ColumnService.instance) {
			ColumnService.instance = this;
			this.columns = [];
		} else {
			return ColumnService.instance;
		}
	}

	async fetch() {
		this.columns = await Promise.resolve(columns);
	}

	getColumns() {
		return this.columns;
	}

	getColumn(id) {
		return this.columns.filter(column => column.id === id)[0];
	}
}
