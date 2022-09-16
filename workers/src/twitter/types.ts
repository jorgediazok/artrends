export interface TwitterTrendsData {
	title: string;
	link: string;
	tweets: string;
}

export interface TwitterTrendsResponse {
	timeline: {
		instructions: Array<{
			addEntries: {
				entries: Array<{
					content: {
						timelineModule: {
							items: Array<{
								item: {
									content: {
										trend: {
											name: string;
											url: {
												url: string;
											};
											trendMetadata: {
												metaDescription: string;
											};
										};
									};
								};
							}>;
						};
					};
				}>;
			};
		}>;
	};
}
