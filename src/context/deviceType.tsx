import {
	type Accessor,
	createContext,
	createSignal,
	onCleanup,
	onMount,
	useContext,
	type JSX,
	createMemo,
} from "solid-js";

export type DeviceType = "desktop" | "tablet" | "mobile";

export type DeviceTypeContext = Accessor<{
	deviceType: Accessor<DeviceType | null>;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}>;

const DeviceTypeContext = createContext<DeviceTypeContext | null>(null);

export function DeviceTypeProvider(props: { children: JSX.Element; throttleTime?: number }) {
	const [deviceType, setDeviceType] = createSignal<DeviceType | null>(null);

	onMount(() => {
		// Define media queries
		const mobileQuery = window.matchMedia("(max-width: 768px)");
		const tabletQuery = window.matchMedia("(min-width: 769px) and (max-width: 1200px)");
		const desktopQuery = window.matchMedia("(min-width: 1201px)");

		function updateDeviceType() {
			if (mobileQuery.matches) {
				setDeviceType("mobile");
			} else if (tabletQuery.matches) {
				setDeviceType("tablet");
			} else if (desktopQuery.matches) {
				setDeviceType("desktop");
			}
		}

		// Add listeners for media query changes
		mobileQuery.addEventListener("change", updateDeviceType);
		tabletQuery.addEventListener("change", updateDeviceType);
		desktopQuery.addEventListener("change", updateDeviceType);

		// Initial check
		updateDeviceType();

		// Cleanup listeners on unmount
		onCleanup(() => {
			mobileQuery.removeEventListener("change", updateDeviceType);
			tabletQuery.removeEventListener("change", updateDeviceType);
			desktopQuery.removeEventListener("change", updateDeviceType);
		});
	});

	const value = createMemo(() => ({
		deviceType,
		isMobile: deviceType() === "mobile",
		isTablet: deviceType() === "tablet",
		isDesktop: deviceType() === "desktop",
	}));

	return <DeviceTypeContext.Provider value={value}>{props.children}</DeviceTypeContext.Provider>;
}

export function useDeviceType() {
	const context = useContext(DeviceTypeContext);
	if (!context) {
		throw new Error("useDeviceType must be used within a DeviceTypeProvider");
	}
	return context;
}
