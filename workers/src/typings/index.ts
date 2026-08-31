export interface TrendsData {
	title: string;
	link: string;
	amount: string;
}

export interface TrendsDataPayload<T> {
	date: Date;
	trends: T[];
}

export interface TrendsDataRecord<TrendsData> {
	_id: string;
	record: {
		date: Date;
		trends: TrendsData[];
	};
}

export interface SpotifyArtistData {
	name: string;
	streak: string;
	prevPosition: string;
	link: string;
}

export interface SpotifySongData {
	name: string;
	author: string;
	streak: string;
	prevPosition: string;
	link: string;
	streams: string;
}

export interface SpotifyPodcastApiData {
	showName: string;
	showPublisher: string;
	showUri: string;
	showImageUrl: string;
	chartRankMove: "UNCHANGED" | "UP" | "DOWN";
}

export interface SpotifyPodcastData {
	name: string;
	publisher: string;
	imageUrl: string;
	chartMovement: "UNCHANGED" | "UP" | "DOWN";
}

export interface YoutubeVideosData {
	title: string;
	link: string;
	channel: string;
	channelLink: string;
	amount: string;
}

export interface PortalData {
	articles: string[];
	links: string[];
}

export interface PortalsData {
	elDestape: PortalData;
	clarin: PortalData;
	laNacion: PortalData;
	infobae: PortalData;
}
