import { type Accessor, type JSX, createContext, createSignal, useContext } from "solid-js";
import { cn } from "../utils/cn";

const SwitchContext = createContext<{
	checked: Accessor<boolean>;
	onValueChange: (checked: boolean) => void;
}>({ checked: createSignal(false)[0], onValueChange: () => {} });

export function useSwitch() {
	const context = useContext(SwitchContext);
	if (!context) {
		throw new Error("useSwitch must be used within a Switch");
	}
	return context;
}

type SwitchProps = {
	children: JSX.Element;
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
	outline?: boolean;
	disabled?: boolean;
	onValueChange: (checked: boolean) => void;
	checked: Accessor<boolean>;
};

export function Switch(props: JSX.IntrinsicElements["div"] & SwitchProps) {
	const variants = {
		primary:
			"bg-neutral-50 dark:bg-neutral-900 border rounded-full border-neutral-200 dark:border-neutral-800",
		secondary: "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-900",
		success: "bg-success-500 dark:bg-success-700 border-success-500 dark:border-success-600",
		danger: "bg-danger-500 dark:bg-danger-700 border-danger-500 dark:border-danger-600",
		warning: "bg-warning-500 dark:bg-warning-700 border-warning-500 dark:border-warning-600",
		info: "bg-info-500 dark:bg-info-700 border-info-500 dark:border-info-600",
	};

	const sizes = {
		sm: "h-6 w-12",
		md: "h-8 w-16",
		lg: "h-10 w-20",
		xl: "h-12 w-24",
	};

	const value = {
		checked: props.checked,
		onValueChange: props.onValueChange,
		variant: props.variant,
	};

	return (
		<SwitchContext.Provider value={value}>
			<button
				type="button"
				onClick={() => props.onValueChange(props.checked())}
				class={cn(
					"p-[3px]",
					{
						[`${variants[props.variant || "primary"]}`]: true,
						[`${sizes[props.size || "sm"]}`]: true,
						disabled: props.disabled,
					},
					props.class,
				)}
			>
				{props.children}
			</button>
		</SwitchContext.Provider>
	);
}

export function SwitchTrack(props: JSX.IntrinsicElements["div"]) {
	const value = useSwitch();

	return (
		<div class={cn("w-full h-full flex", props.class)}>
			<div class={`transition-all ${value.checked() ? "flex-grow" : ""}`} />

			{props.children}
		</div>
	);
}

export function SwitchThumb(props: JSX.IntrinsicElements["div"] & { children?: JSX.Element }) {
	const value = useSwitch();

	return (
		<div
			class={cn(
				{
					"bg-neutral-800 dark:bg-neutral-700": value.checked(),
				},
				`h-full aspect-square bg-black rounded-full flex-grow-0 ${props.class}`,
			)}
		>
			{props.children}
		</div>
	);
}
