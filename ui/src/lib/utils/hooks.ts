import { theme } from "antd";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { message } from "antd";

const useDarkMode = () => {
	const { defaultAlgorithm, darkAlgorithm } = theme;
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return {
		algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
		toggleTheme,
		isDarkMode,
	};
};

export default useDarkMode;

const usePageTitle = (routes: Array<{ title: string; path: string }>) => {
	const location = useLocation();

	const currentRoute = routes.find(
		(route) => route.path === location.pathname
	);

	return currentRoute ? currentRoute.title : "Default Title";
};

const useWindowWidth = (width: number) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			const currentWidth = window.innerWidth;
			setWindowWidth(currentWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [width]);

	return { windowWidth };
};

const useCopyToClipboard = (timeout = 500) => {
	const [copied, setCopied] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const copyToClipboard = useCallback(
		(text: string) => {
			navigator.clipboard.writeText(text);

			messageApi.open({
				type: "success",
				content: `Copied: ${text} 👍`,
			});

			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, timeout);
		},
		[messageApi, timeout]
	);

	return { copied, copyToClipboard, ClipboardMessage: contextHolder };
};

export { usePageTitle, useWindowWidth, useCopyToClipboard };