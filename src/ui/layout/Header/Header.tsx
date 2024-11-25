import { type Accessor, createMemo, createSignal, For, onMount, type Setter, Show } from "solid-js";
import { Switch, SwitchThumb, SwitchTrack } from "~/ui/elements/Switch";
import { useScrollY } from "~/context/scrollYPosition";
import { useDeviceType } from "~/context/deviceType";
import styles from "./header.module.css";
import { Portal } from "solid-js/web";
import { useTheme } from "~/context/theme";

export default function Header() {
	const scrollY = useScrollY();
	const deviceInfo = useDeviceType();

	const [menuOpen, setMenuOpen] = createSignal(false);

	const links = [
		{
			name: "LinkedIn",
			href: "https://www.linkedin.com/in/hunterwoodall30",
		},
		{
			name: "GitHub",
			href: "https://github.com/hwoodall30",
		},
		{
			name: "My Resume",
			href: "/Hunter_Woodall_11|24.pdf",
		},
	];

	return (
		<header
			class={`fixed top-0 left-0 right-0 transition-all bg-neutral-50/50 dark:bg-neutral-950/50 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 backdrop-blur-md ${scrollY() > 50 ? "px-10 h-20 lg:px-20" : "px-5 h-14 lg:px-12"}`}
		>
			<div class="flex items-center gap-2">
				<img src="/HunterWoodallLogo.png" alt="Hunter Woodall" class="w-8 h-8 rounded-full" />
				<h3>Hunter Woodall</h3>
			</div>

			<div class="flex items-center gap-5">
				{deviceInfo().deviceType() !== "desktop" ? (
					<MobileMenu open={menuOpen} setOpen={setMenuOpen} links={links} />
				) : (
					<DesktopMenu links={links} />
				)}
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

function DesktopMenu(props: { links: Array<{ name: string; href: string }> }) {
	return (
		<>
			<ul class="flex items-center gap-2 text-xs">
				<For each={props.links}>
					{(link, i) => (
						<>
							<li>
								<a
									href={link.href}
									target="_blank"
									rel="noreferrer"
									class="text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors relative"
								>
									{link.name}
								</a>
							</li>
							{i() !== props.links?.length - 1 ? " / " : null}
						</>
					)}
				</For>
			</ul>

			<ThemeSwitcher />
		</>
	);
}

type MobileMenuProps = {
	open: Accessor<boolean>;
	setOpen: Setter<boolean>;
	links: Array<{
		name: string;
		href: string;
	}>;
};
function MobileMenu(props: MobileMenuProps) {
	const themeInfo = useTheme();
	const [animationOpen, setAnimationOpen] = createSignal(props.open());

	function handleClick() {
		if (props.open()) {
			setAnimationOpen(false);
			setTimeout(() => props.setOpen(false), 300);
		} else {
			props.setOpen(true);
			requestAnimationFrame(() => setAnimationOpen(true));
		}
	}

	async function closeMenu() {
		setAnimationOpen(false);
		setTimeout(() => props.setOpen(false), 300);
	}
	return (
		<>
			<button onClick={handleClick} type="button">
				<div class={`${styles["wrapper-menu"]} ${props.open() ? styles.open : ""}`}>
					<div
						class={`${styles["line-menu"]}  ${styles.half}  ${styles.start} ${themeInfo().isDark ? "bg-neutral-300" : "bg-neutral-700"}`}
					/>
					<div class={`${styles["line-menu"]} ${themeInfo().isDark ? "bg-neutral-300" : "bg-neutral-700"}`} />
					<div
						class={`${styles["line-menu"]}  ${styles.half}  ${styles.end} ${themeInfo().isDark ? "bg-neutral-300" : "bg-neutral-700"}`}
					/>
				</div>
			</button>

			<Show when={props.open()}>
				<Portal>
					<div
						class={`flex flex-col p-5 fixed top-0 right-0 bottom-0 h-full bg-neutral-50 dark:bg-neutral-950 transition-all duration-300 border-l border-neutral-100 dark:border-neutral-900 ${animationOpen() ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
					>
						<button
							class="absolute top-3 right-3 text-neutral-950 dark:text-neutral-50"
							type="button"
							onClick={closeMenu}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
								<title>Close Button</title>
								<path
									fill="currentColor"
									d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
								/>
							</svg>
						</button>
						<ul class="flex flex-col divide-y min-w-60 divide-neutral-200 dark:divide-neutral-900">
							<For each={props.links}>
								{(link, i) => (
									<li class="py-1">
										<a
											href={link.href}
											target="_blank"
											rel="noreferrer"
											class="text-xs text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors relative"
										>
											{link.name}
										</a>
									</li>
								)}
							</For>
						</ul>

						<ThemeSwitcher size="sm" class="mt-auto self-end" />
					</div>
				</Portal>
			</Show>
		</>
	);
}

function ThemeSwitcher(props: { size?: "sm" | "md" | "lg"; class?: string }) {
	const themeInfo = useTheme();

	const checked = createMemo(() => themeInfo().isDark);

	async function onValueChange() {
		if (checked()) {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.add("dark");
		}

		themeInfo().setTheme(checked() ? "light" : "dark");
	}

	return (
		<Switch
			class={props.class || ""}
			checked={checked}
			onValueChange={onValueChange}
			size={props?.size || "md"}
		>
			<SwitchTrack>
				<SwitchThumb class={`p-0.5 ${themeInfo().isDark ? "text-neutral-950" : "text-yellow-300"}`}>
					{themeInfo().isDark ? <MoonIcon /> : <SunIcon />}
				</SwitchThumb>
			</SwitchTrack>
		</Switch>
	);
}
