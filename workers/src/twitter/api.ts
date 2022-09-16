import axios from "axios";

// Environment variables
import { TWITTER_TOKEN } from "../config";

// Types
import { TwitterTrendsResponse } from "./types";

export async function getTwitterTrendingTopics(url: string, itemLimit: number) {
	const res = await axios.get<TwitterTrendsResponse>(url, {
		params: {
			include_profile_interstitial_type: "1",
			include_blocking: "1",
			include_blocked_by: "1",
			include_followed_by: "1",
			include_want_retweets: "1",
			include_mute_edge: "1",
			include_can_dm: "1",
			include_can_media_tag: "1",
			include_ext_has_nft_avatar: "1",
			skip_status: "1",
			cards_platform: "Web-12",
			include_cards: "1",
			include_ext_alt_text: "true",
			include_ext_limited_action_results: "false",
			include_quote_count: "true",
			include_reply_count: "1",
			tweet_mode: "extended",
			include_ext_collab_control: "false",
			include_entities: "true",
			include_user_entities: "true",
			include_ext_media_color: "true",
			include_ext_media_availability: "true",
			include_ext_sensitive_media_warning: "true",
			include_ext_trusted_friends_metadata: "true",
			send_error_codes: "true",
			simple_quoted_tweet: "true",
			count: "20",
			include_page_configuration: "true",
			initial_tab_id: "trending",
			entity_tokens: "false",
			ext: "mediaStats,highlightedLabel,hasNftAvatar,voiceInfo,enrichments,superFollowMetadata,unmentionInfo,editControl,vibe",
		},
		headers: {
			authority: "twitter.com",
			accept: "*/*",
			"accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
			authorization: "Bearer " + TWITTER_TOKEN,
			cookie:
				'guest_id_marketing=v1%3A164493746546553647; guest_id_ads=v1%3A164493746546553647; kdt=jAPKFge9gFJpEJMjj8uEvnLgkVjM2bDnDHIForhF; lang=es; tweetdeck_version=legacy; at_check=true; des_opt_in=Y; dnt=1; mbox=PC#90c0e39e64414d0983b3c2e2c5a7654e.34_0#1725909967|session#3fee957a394b40f897dbe58adb551fb4#1662667086; _sl=1; personalization_id="v1_oNrth/UPDx7am21UZFFv+A=="; guest_id=v1%3A166327930273950537; gt=1570533346882600961; g_state={"i_l":0}; auth_token=f96495aaa9ada10ebad35f82f73382a77e76b0be; ct0=51b89c661b211ecc5144078a9baa5bc6283c02683ecbc813185974f416add57af319e2817ef6515e3eef16efc24f45db00745319577df6591b0ed4e51a5db991f7f9908313abd4903fd9a970c779681a; twid=u%3D1570533546434912256',
			referer: "https://twitter.com/explore/tabs/trending",
			"sec-ch-ua":
				'"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"user-agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
			"x-csrf-token":
				"51b89c661b211ecc5144078a9baa5bc6283c02683ecbc813185974f416add57af319e2817ef6515e3eef16efc24f45db00745319577df6591b0ed4e51a5db991f7f9908313abd4903fd9a970c779681a",
			"x-twitter-active-user": "yes",
			"x-twitter-auth-type": "OAuth2Session",
			"x-twitter-client-language": "es",
			"x-twitter-utcoffset": "-0300",
		},
	});

	const trendsData =
		res.data.timeline.instructions[1].addEntries.entries[1].content.timelineModule.items.slice(
			0,
			itemLimit
		);

	const result = trendsData.map(trend => {
		const { item } = trend;
		const title = item.content.trend.name;
		const link = encodeURI(
			`http://twitter.com/search?q=${title}&src=trend_click&vertical=trends`
		);
		const tweets = item.content.trend.trendMetadata.metaDescription || "";

		return {
			title,
			link,
			tweets,
		};
	});

	return result;
}
