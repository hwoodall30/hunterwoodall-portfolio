import type { JSX } from "solid-js";
import { cn } from "../utils/cn";

type CardProps = {
	children: JSX.Element;
};

export function Card(props: JSX.IntrinsicElements["div"] & CardProps) {
	return (
		<div
			class={cn(
				{
					"bg-white dark:bg-neutral-950 p-3 rounded-md border border-neutral-200 dark:border-neutral-800":
						true,
				},
				props.class,
			)}
			classList={{}}
		>
			{props.children}
		</div>
	);
}
