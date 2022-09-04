export interface GoogleTrendsData {
	title: string;
	link: string;
	searchCount: string;
}

export interface GoogleTrendsDataPayload {
	date: Date;
	trends: GoogleTrendsData[];
}

export interface GoogleTrendsDataRecord {
	_id: string;
	record: {
		date: Date;
		trends: GoogleTrendsData[];
	};
}
