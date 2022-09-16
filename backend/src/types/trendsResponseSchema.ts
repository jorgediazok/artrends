import { Type } from "@sinclair/typebox";

export const GoogleTrendPayload = Type.Object({
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
	fromCache: Type.Boolean(),
});

export const TwitterTrendPayload = Type.Object({
	current: Type.Object({
		_id: Type.String(),
		record: Type.Object({
			date: Type.String(),
			trends: Type.Array(
				Type.Object({
					title: Type.String(),
					link: Type.String(),
					tweets: Type.String(),
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
					tweets: Type.String(),
				})
			),
		}),
	}),
	fromCache: Type.Boolean(),
});

export interface TrendRecord<Trend> {
	record: {
		date: string;
	};
	trends: Array<Trend>;
}
