import { TrendRecord } from "./trendsResponseSchema";

export interface CacheResult<Data> {
	item?: Data;
	ttl: number;
	stored: number;
}

export function isCacheResult(result: any): result is CacheResult<TrendRecord> {
	return result && "ttl" in result;
}
