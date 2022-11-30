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

export const ArtistTrendPayload = Type.Object({
	current: Type.Optional(
		Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						name: Type.String(),
						streak: Type.String(),
						prevPosition: Type.String(),
						link: Type.String(),
					})
				),
			}),
		})
	),
	previous: Type.Optional(
		Type.Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						name: Type.String(),
						streak: Type.String(),
						prevPosition: Type.String(),
						link: Type.String(),
					})
				),
			}),
		})
	),
	fromCache: Type.Boolean(),
});

export const SongTrendPayload = Type.Object({
	current: Type.Optional(
		Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						name: Type.String(),
						author: Type.String(),
						streak: Type.String(),
						prevPosition: Type.String(),
						link: Type.String(),
						streams: Type.String(),
					})
				),
			}),
		})
	),
	previous: Type.Optional(
		Type.Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						name: Type.String(),
						author: Type.String(),
						streak: Type.String(),
						prevPosition: Type.String(),
						link: Type.String(),
						streams: Type.String(),
					})
				),
			}),
		})
	),
	fromCache: Type.Boolean(),
});

export const PodcastTrendPayload = Type.Object({
	current: Type.Optional(
		Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						name: Type.String(),
						chartMovement: Type.Union([
							Type.Literal("UP"),
							Type.Literal("DOWN"),
							Type.Literal("UNCHANGED"),
						]),
						publisher: Type.String(),
						imageUrl: Type.String(),
						link: Type.String(),
					})
				),
			}),
		})
	),
	previous: Type.Optional(
		Type.Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						name: Type.String(),
						chartMovement: Type.Union([
							Type.Literal("UP"),
							Type.Literal("DOWN"),
							Type.Literal("UNCHANGED"),
						]),
						publisher: Type.String(),
						imageUrl: Type.String(),
						link: Type.String(),
					})
				),
			}),
		})
	),
	fromCache: Type.Boolean(),
});

export const YoutubeTrendPayload = Type.Object({
	current: Type.Optional(
		Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						title: Type.String(),
						link: Type.String(),
						amount: Type.String(),
						channel: Type.String(),
						channelLink: Type.String(),
					})
				),
			}),
		})
	),
	previous: Type.Optional(
		Type.Object({
			_id: Type.String(),
			record: Type.Object({
				date: Type.String(),
				trends: Type.Array(
					Type.Object({
						title: Type.String(),
						link: Type.String(),
						amount: Type.String(),
						channel: Type.String(),
						channelLink: Type.String(),
					})
				),
			}),
		})
	),
	fromCache: Type.Boolean(),
});

export interface TrendRecord<T> {
	record: {
		date: string;
	};
	trends: Array<T>;
}
