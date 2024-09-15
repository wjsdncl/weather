"use client";
// src/pages/index.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		humidity: number;
	};
	weather: { description: string; icon: string }[];
	name: string;
}

export default function Home() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;

					try {
						const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
							params: {
								lat: latitude,
								lon: longitude,
								appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
								units: "metric",
								lang: "kr",
							},
						});
						setWeatherData(response.data);
					} catch (error) {
						setError("날씨 정보를 가져오는 중 오류가 발생했습니다.");
					}
				},
				(error) => {
					setError("위치 정보를 가져올 수 없습니다.");
				},
			);
		} else {
			setError("이 브라우저는 위치 정보 기능을 지원하지 않습니다.");
		}
	}, []);

	if (error)
		return (
			<main className="flex min-h-screen items-center justify-center p-4">
				<div className="w-fit rounded-lg bg-card-dark p-8 text-center text-white shadow-lg">
					<h1 className="mb-4 text-3xl font-bold">{error}</h1>
				</div>
			</main>
		);

	if (!weatherData)
		return (
			<main className="flex min-h-screen items-center justify-center p-4">
				<div className="w-fit rounded-lg bg-card-dark p-8 text-center text-white shadow-lg">
					<h1 className="mb-4 text-3xl font-bold">날씨 정보를 가져오는 중...</h1>
				</div>
			</main>
		);

	return (
		<main className="flex min-h-screen items-center justify-center bg-background-dark p-4">
			<div className="max-w-md rounded-lg bg-card-dark p-8 text-center text-text-light shadow-lg">
				<h1 className="mb-4 text-3xl font-bold">현재 위치의 날씨</h1>
				<h2 className="mb-2 text-2xl font-semibold">{weatherData.name}</h2>
				<p className="mb-4 text-lg capitalize text-text-secondary">{weatherData.weather[0].description}</p>
				<div className="mb-4 flex items-center justify-center">
					<img
						src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
						alt={weatherData.weather[0].description}
						className="h-20 w-20"
					/>
					<div className="ml-4 text-left">
						<p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
						<p className="text-sm text-text-accent">체감 온도: {weatherData.main.feels_like}°C</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-sm text-text-accent">최저 온도</p>
						<p className="text-lg font-semibold">{weatherData.main.temp_min}°C</p>
					</div>
					<div>
						<p className="text-sm text-text-accent">최고 온도</p>
						<p className="text-lg font-semibold">{weatherData.main.temp_max}°C</p>
					</div>
					<div>
						<p className="text-sm text-text-accent">습도</p>
						<p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
					</div>
				</div>
			</div>
		</main>
	);
}
