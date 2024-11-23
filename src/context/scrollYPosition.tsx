import {
	type Accessor,
	createContext,
	createSignal,
	onCleanup,
	onMount,
	useContext,
	type JSX,
} from "solid-js";

const ScrollYContext = createContext<Accessor<number> | null>(null);

const throttle = <T extends (...args: unknown[]) => void>(
	fn: T,
	wait: number,
): ((...args: Parameters<T>) => void) => {
	let lastTime = 0;
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		const now = Date.now();
		const remainingTime = wait - (now - lastTime);

		if (remainingTime <= 0) {
			// Immediately execute if enough time has passed
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			lastTime = now;
			fn(...args);
		} else if (!timeout) {
			// Otherwise, wait and execute after the remaining time
			timeout = setTimeout(() => {
				lastTime = Date.now();
				timeout = null;
				fn(...args);
			}, remainingTime);
		}
	};
};

export function ScrollYProvider(props: { children: JSX.Element; throttleTime?: number }) {
	const [scrollY, setScrollY] = createSignal(0);

	onMount(() => {
		let handleScroll = () => {
			setScrollY(window.scrollY);
		};

		if (props.throttleTime) {
			handleScroll = throttle(handleScroll, props.throttleTime);
		}

		window.addEventListener("scroll", handleScroll);

		onCleanup(() => {
			window.removeEventListener("scroll", handleScroll);
		});
	});

	return <ScrollYContext.Provider value={scrollY}>{props.children}</ScrollYContext.Provider>;
}

export function useScrollY() {
	const context = useContext(ScrollYContext);
	if (!context) {
		throw new Error("useScroll must be used within a ScrollProvider");
	}
	return context;
}
