export interface TrendsData {
	title: string;
	link: string;
	amount: string;
}

export interface TrendsDataPayload {
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
