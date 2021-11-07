import { ValueTransformer } from "typeorm";
import { LocalDate, LocalDateTime, nativeJs } from "@js-joda/core";

export const LocalDateTransformer: ValueTransformer = {
	from: (value: string): LocalDate => {
		if (!value) {
			return null;
		}
		return LocalDate.parse(value);
	},
	to: (value: LocalDate): string => {
		if (!value) {
			return null;
		}
		return value.toString();
	},
};

export const LocalDateTimeTransformer: ValueTransformer = {
	from: (value: Date): LocalDateTime => {
		if (!value) {
			return null;
		}
		return LocalDateTime.from(nativeJs(value));
	},
	to: (value: LocalDateTime): string => {
		if (!value) {
			return LocalDateTime.now().toString();
		}
		return value.toString();
	},
};
