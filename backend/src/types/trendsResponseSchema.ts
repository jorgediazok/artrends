import { Type } from "@sinclair/typebox";

export const TrendPayload = Type.Object({
	current: Type.Object({
		_id: Type.String(),
		record: Type.Object({
			date: Type.String(),
			trends: Type.Array(
				Type.Object({
					title: Type.String(),
					link: Type.String(),
					amount: Type.String(),
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
					amount: Type.String(),
				})
			),
		}),
	}),
	fromCache: Type.Boolean(),
});

export interface TrendRecord<T> {
	record: {
		date: string;
	};
	trends: Array<T>;
}
