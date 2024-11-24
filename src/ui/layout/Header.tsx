import { createSignal, onMount } from "solid-js";
import { Switch, SwitchThumb, SwitchTrack } from "../elements/Switch";
import { getCookie, setCookie } from "vinxi/http";
import { useScrollY } from "~/context/scrollYPosition";

export default function Header() {
	const scrollY = useScrollY();

	const [checked, setChecked] = createSignal(false);

	async function getThemeCookie() {
		"use server";
		return getCookie("theme");
	}

	async function setThemeCookie(value: string) {
		"use server";

		setCookie("theme", value, {
			path: "/",
			maxAge: 2147483647,
			secure: true,
			httpOnly: true,
			sameSite: "strict",
		});

		return true;
	}

	async function onValueChange(checked: boolean) {
		setChecked(!checked);
		if (checked) {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.add("dark");
		}

		await setThemeCookie(checked ? "light" : "dark");
	}

	onMount(async () => {
		setChecked((await getThemeCookie()) === "dark");
	});

	return (
		<header
			class={`fixed top-0 left-0 right-0 transition-all bg-neutral-50/50 dark:bg-neutral-950/50 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 backdrop-blur-md ${scrollY() > 50 ? "px-10 h-20 lg:px-20" : "px-5 h-14 lg:px-12"}`}
		>
			<h3>Hunter Woodall</h3>
			<div>
				<Switch checked={checked} onValueChange={onValueChange} size="md">
					<SwitchTrack>
						<SwitchThumb class={`p-0.5 ${checked() ? "text-neutral-950" : "text-yellow-300"}`}>
							{checked() ? <MoonIcon /> : <SunIcon />}
						</SwitchThumb>
					</SwitchTrack>
				</Switch>
			</div>
		</header>
	);
}

function SunIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<title>Sun</title>
			<path
				fill="currentColor"
				d="M12 20.937a1.07 1.07 0 0 1-.94-.542L9.61 17.9a.084.084 0 0 0-.1-.041l-2.782.741A1.087 1.087 0 0 1 5.4 17.272l.748-2.8a.09.09 0 0 0-.041-.1l-2.5-1.439a1.086 1.086 0 0 1 0-1.881L6.1 9.61a.09.09 0 0 0 .041-.1L5.4 6.728A1.087 1.087 0 0 1 6.728 5.4l2.8.748a.09.09 0 0 0 .1-.041l1.439-2.5A1.08 1.08 0 0 1 12 3.063a1.07 1.07 0 0 1 .94.542L14.39 6.1a.084.084 0 0 0 .1.041l2.782-.741A1.087 1.087 0 0 1 18.6 6.728l-.748 2.8a.09.09 0 0 0 .041.1l2.5 1.439a1.086 1.086 0 0 1 0 1.881L17.9 14.39a.09.09 0 0 0-.041.1l.748 2.784a1.087 1.087 0 0 1-1.335 1.326l-2.8-.748a.09.09 0 0 0-.1.041l-1.439 2.5a1.08 1.08 0 0 1-.94.544Zm-2.466-4.084a1.09 1.09 0 0 1 .942.541l1.448 2.5a.08.08 0 0 0 .075.043a.08.08 0 0 0 .074-.043l1.44-2.5a1.08 1.08 0 0 1 1.221-.507l2.8.747a.087.087 0 0 0 .106-.106l-.747-2.785a1.09 1.09 0 0 1 .5-1.222l2.5-1.448a.086.086 0 0 0 0-.15l-2.5-1.439a1.086 1.086 0 0 1-.507-1.221l.747-2.8a.08.08 0 0 0-.022-.083a.09.09 0 0 0-.085-.023l-2.784.747a1.09 1.09 0 0 1-1.222-.5l-1.448-2.5A.08.08 0 0 0 12 4.063a.08.08 0 0 0-.074.043l-1.44 2.5a1.09 1.09 0 0 1-1.222.507l-2.8-.747a.087.087 0 0 0-.106.106l.752 2.782a1.09 1.09 0 0 1-.5 1.222l-2.5 1.448a.08.08 0 0 0-.047.076a.08.08 0 0 0 .043.074l2.5 1.44a1.09 1.09 0 0 1 .507 1.221l-.747 2.8a.08.08 0 0 0 .022.083a.09.09 0 0 0 .085.023l2.784-.747a1 1 0 0 1 .277-.041"
			/>
			<path
				fill="currentColor"
				d="M12 15.875A3.875 3.875 0 1 1 15.875 12A3.88 3.88 0 0 1 12 15.875m0-6.75A2.875 2.875 0 1 0 14.875 12A2.88 2.88 0 0 0 12 9.125"
			/>
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<title>Moon</title>
			<path
				fill="currentColor"
				d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"
			/>
		</svg>
	);
}
