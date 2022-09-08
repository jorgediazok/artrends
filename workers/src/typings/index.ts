export interface TrendsData {
	title: string;
	link: string;
	searchCount: string;
}

export interface TrendsDataPayload {
	date: Date;
	trends: TrendsData[];
}

export interface TrendsDataRecord {
	_id: string;
	record: {
		date: Date;
		trends: TrendsData[];
	};
}
