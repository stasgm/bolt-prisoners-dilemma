import { useEffect, useState } from "react";

export function useWindowSize() {
	const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 768);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
}
