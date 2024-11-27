import PrisonersDilemma from "@/components/PrisonersDilemma";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
			<div className="container mx-auto px-4 py-8">
				<PrisonersDilemma />
			</div>
		</main>
	);
}
