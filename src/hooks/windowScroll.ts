import { createSignal, onCleanup, onMount } from "solid-js";

export function useWindowScroll() {
	const [scrollY, setScrollY] = createSignal(0);

	onMount(() => {
		function handleScroll() {
			setScrollY(window.scrollY);
		}

		window.addEventListener("scroll", handleScroll);

		onCleanup(() => {
			window.removeEventListener("scroll", handleScroll);
		});
	});

	return [scrollY, setScrollY];
}
