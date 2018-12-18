import columns from '../columns';

export default class ColumnService {
	constructor() {
		if (!ColumnService.instance) {
			ColumnService.instance = this;
		} else {
			return this;
		}
	}

	fetch() {
		this.columns = columns.columns;
	}

	getColumns() {
		return this.columns;
	}

	getColumn(id) {
		if (!this.getColumns()) {
			this.fetch();
		}
		return this.getColumns().filter(column => column.id === id)[0];
	}
}
