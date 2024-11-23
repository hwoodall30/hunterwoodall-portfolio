import type { JSX } from "solid-js";
import { ScrollYProvider } from "~/context/scrollYPosition";
import Header from "~/ui/layout/Header";

export default function MainLayout(props: { children: JSX.Element }) {
	return (
		<ScrollYProvider throttleTime={100}>
			<Header />
			{props.children}
		</ScrollYProvider>
	);
}
