import columns from './columns';

export default class ColumnService {
	fetch() {
		console.log('ColumnService.fetch()', columns);
		return columns;
	}
}
