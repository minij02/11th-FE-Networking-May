import { AuthGuard } from "@/shared/auth/AuthGuard";
import { WeatherPanel } from "@/widgets/WeatherPanel";
export const WeatherPage = () => {
    return (
        <main className="min-h-screen bg-gray-100">
          <WeatherPanel />
        </main>
      );
};