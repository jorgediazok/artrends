import { Static, Type } from "@sinclair/typebox";

export const TrendPayload = Type.Object({
	current: Type.Object({
		_id: Type.String(),
		record: Type.Object({
			date: Type.String(),
			trends: Type.Array(
				Type.Object({
					title: Type.String(),
					link: Type.String(),
					searchCount: Type.String(),
				})
			),
		}),
	}),
	previous: Type.Object({
		_id: Type.String(),
		record: Type.Object({
			date: Type.String(),
			trends: Type.Array(
				Type.Object({
					title: Type.String(),
					link: Type.String(),
					searchCount: Type.String(),
				})
			),
		}),
	}),
});

export interface TrendRecord {
	record: {
		date: string;
	};
	trends: Array<{ title: string; link: string; searchCount: string }>;
}
