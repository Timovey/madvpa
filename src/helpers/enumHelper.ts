import { InternalServerError } from '../common/error';

const StringIsNotNumber = (value: string) => isNaN(Number(value)) === true;

interface ConvertStatusToNumberType {
	<Type extends Object>(status: string, arg: Type): number;
}
export const convertEnumStringToNumber: ConvertStatusToNumberType = function (
	status,
	arg
) {
	const enumObj = Object.assign({}, Object.keys(arg).filter(StringIsNotNumber));

	for (const [key, value] of Object.entries(enumObj)) {
		if (value == status) {
			return +key + 1;
		}
	}

	throw new InternalServerError(`Ошибка при конверте enum ${typeof arg}`);
};
