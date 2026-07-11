import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { TelegramProvider } from "@/platform/telegram/telegram-provider";
import { BottomNavigation } from "@/shared/ui/bottom-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Хвостократия",
  description: "Локальная социальная сеть для владельцев питомцев",
  applicationName: "Хвостократия",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <TelegramProvider>
          <div className="app-shell">
            <main className="app-content">{children}</main>
            <BottomNavigation />
          </div>
        </TelegramProvider>
      </body>
    </html>
  );
}
