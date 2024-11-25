import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { ScrollYProvider } from "./context/scrollYPosition";
import { DeviceTypeProvider } from "./context/deviceType";
import { ThemeProvider } from "./context/theme";

export default function App() {
	return (
		<ThemeProvider>
			<DeviceTypeProvider>
				<ScrollYProvider throttleTime={100}>
					<Router root={(props) => <Suspense>{props.children}</Suspense>}>
						<FileRoutes />
					</Router>
				</ScrollYProvider>
			</DeviceTypeProvider>
		</ThemeProvider>
	);
}
