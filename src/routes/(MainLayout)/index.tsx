import { createEffect, For } from "solid-js";
import { useScrollY } from "~/context/scrollYPosition";
import { Card } from "~/ui/elements/Card";

export default function Home() {
	const scrollY = useScrollY();

	// biome-ignore lint:true
	let myWorkElement: HTMLDivElement | undefined = undefined;
	function scrollToMyWork() {
		if (!myWorkElement) return;
		myWorkElement.scrollIntoView({
			behavior: "smooth",
		});
	}

	const projects = [
		{
			name: "Big Share Blount",
			description: "A giving website for local Christian organizations.",
			link: "https://bigshareblount.org/",
		},
		{
			name: "Blount Memorial Foundation",
			description: "Donation website for Blount Memorial Foundation with information on their organization.",
			link: "https://bmf.vercel.app/",
		},
		{
			name: "Vote Facts Blount",
			description: "Website with information about Blount County Elections and Voter resources.",
			link: "https://votefactsblount.com/",
		},
		{
			name: "Poll App",
			description:
				"A polling app used for creating and sending polls. This was used by a sports team I was on to create polls for who will be attending each game.",
			link: "https://vote-polls.vercel.app/",
		},
		{
			name: "QR Code Generator",
			description:
				"App used to generate QR codes. This was used to automate a process for a company that I originally did manually.",
			link: "https://qrcodemaker.vercel.app/",
		},
		{
			name: "Petty Marketing",
			description: "A website for a marketing company.",
			link: "https://petty-marketing.vercel.app/",
		},
		{
			name: "Webcam App",
			description: "A simple app that uses WebRTC to stream your webcam peer to peer with other users.",
			link: "https://obs-webcam.vercel.app",
		},
		{
			name: "Interior Design Site",
			description: "Starting site for a potential interior design company. (NOT COMPLETE)",
			link: "https://aliciakatiewebsite.vercel.app/",
		},
		{
			name: "Web Component Todo List",
			description: "A todo list built with Web Components.",
			link: "https://web-components-todo-app.vercel.app/",
		},
		{
			name: "Signal Flow JS",
			description:
				"A signals implementation for JavaScript with a templating syntax that requires no build step.",
			link: "https://github.com/hwoodall30/SignalFlow",
		},
	];

	return (
		<main class="">
			<div class="min-h-screen grid place-items-center place-content-center p-5">
				<img
					src="/HunterWoodall.jpeg"
					alt="Hunter Woodall"
					class="w-[200px] h-[200px] rounded-full mb-2 border-4 border-neutral-300 dark:border-neutral-800"
				/>
				<p class="mb-8 text-sm font-semibold font-sans">Hi, I'm Hunter 👋</p>
				<h1 class="font-sans py-1 text-5xl text-center max-w-[375px] text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-500/30 dark:from-neutral-300 dark:via-neutral-500 dark:to-neutral-500/30">
					Full Stack Software Engineer
				</h1>

				<button
					onClick={scrollToMyWork}
					type="button"
					class="px-8 py-3 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mt-10"
				>
					See my work
				</button>
			</div>

			<div
				ref={myWorkElement}
				id="my-work"
				class="min-h-screen bg-neutral-100 dark:bg-neutral-900 grid place-items-center px-5 py-20 gap-5"
			>
				<h2 class="self-end text-2xl">Projects</h2>
				<ul class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 w-full max-w-4xl min-w-0 grid-rows-[auto_1fr_auto]">
					<For each={projects}>
						{(p) => (
							<li class="h-full flex-1 grid row-span-3 grid-rows-subgrid justify-self-center w-full">
								<Card class="grid gap-4 p-4 h-full row-span-3 grid-rows-subgrid dark:bg-neutral-950/40">
									<h2 class="font-bold text-xl">{p.name}</h2>
									<p class="text-xs">{p.description}</p>
									<a
										href={p.link}
										target="_blank"
										rel="noreferrer"
										class="w-fit text-sm text-primary-500 dark:text-primary-400 hover:underline underline-offset-4"
									>
										View Project
									</a>
								</Card>
							</li>
						)}
					</For>
				</ul>
			</div>
		</main>
	);
}
