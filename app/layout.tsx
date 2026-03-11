import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { UsernameProvider } from "./context/UserContetext";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"], // pesos disponíveis
});

export const metadata: Metadata = {
	title: "Codeleap test",
	description: "This is my soluction for the Codeleap test tech",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} antialiased`}>
				<UsernameProvider>
					{children}
				</UsernameProvider>
			</body>
		</html>
	);
}