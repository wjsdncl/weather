import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Weather App",
	description: "A simple weather app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className="bg-background-dark">{children}</body>
		</html>
	);
}
