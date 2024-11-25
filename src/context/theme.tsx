import {
	type Accessor,
	createContext,
	createSignal,
	onMount,
	useContext,
	type JSX,
	createMemo,
} from "solid-js";
import { getCookie, setCookie } from "vinxi/http";

type ThemeContextType = Accessor<{
	theme: Accessor<"dark" | "light" | null>;
	setTheme: (value: "dark" | "light") => void;
	getThemeCookie: () => Promise<"dark" | "light" | null>;
	setThemeCookie: (value: "dark" | "light") => Promise<boolean>;
	isDark: boolean;
	isLight: boolean;
}>;

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider(props: { children: JSX.Element; throttleTime?: number }) {
	const [theme, setTheme] = createSignal<"dark" | "light" | null>(null);

	async function getThemeCookie() {
		"use server";
		return getCookie("theme") as "dark" | "light" | null;
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

	function setThemeAndCookie(value: "dark" | "light") {
		setTheme(value);
		setThemeCookie(value);
	}

	onMount(async () => {
		const theme = (await getThemeCookie()) as "dark" | "light" | null;
		setTheme(theme);
	});

	const value = createMemo(() => ({
		theme,
		setTheme: setThemeAndCookie,
		getThemeCookie,
		setThemeCookie,
		isDark: theme() === "dark",
		isLight: theme() === "light",
	}));

	return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
