type RateWeightType = {
	[key: string]: number;
};
const rateWeight: RateWeightType = {
	age: 1,
	height: 0.8,
	weight: 0.9,
	gender: 0.6,
	season: 0.5
};
export { rateWeight };
