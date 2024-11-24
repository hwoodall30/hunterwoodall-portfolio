import type { JSX } from "solid-js";
import Header from "~/ui/layout/Header";

export default function MainLayout(props: { children: JSX.Element }) {
	return (
		<>
			<Header />
			{props.children}
		</>
	);
}
