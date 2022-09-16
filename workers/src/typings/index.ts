export interface TrendsDataPayload<TrendsData> {
	date: Date;
	trends: TrendsData[];
}

export interface TrendsDataRecord<TrendsData> {
	_id: string;
	record: {
		date: Date;
		trends: TrendsData[];
	};
}
