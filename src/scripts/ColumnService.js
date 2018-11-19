import columns from './columns';

export default class ColumnService {
	constructor() {
		if (!ColumnService.instance) {
			ColumnService.instance = this;
		} else {
			return this;
		}
	}

	fetch() {
		return columns;
	}
}
