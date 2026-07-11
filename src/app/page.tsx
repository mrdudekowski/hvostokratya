import { getPublicConfig } from "@/platform/env/server-env";
import { PlatformEntry } from "@/platform/telegram/platform-entry";
import { TelegramAuthBootstrap } from "@/features/auth/presentation/telegram-auth-bootstrap";

const capabilities = [
  {
    title: "Локальная лента",
    description: "Полезные истории, вопросы и новости питомцев вашего района.",
  },
  {
    title: "Pet-карта",
    description: "Места, прогулки и важные объявления в одном безопасном пространстве.",
  },
  {
    title: "Реальная помощь",
    description: "Отзывы, потеряшки, приюты и знакомства без раскрытия точной геолокации.",
  },
] as const;

export default function HomePage() {
  const { telegramBotUsername } = getPublicConfig();

  return (
    <div className="home-page">
      <header className="hero">
        <p className="eyebrow">Telegram Mini App</p>
        <h1>Город становится дружелюбнее, когда хвосты знакомы</h1>
        <p className="hero-copy">
          Хвостократия объединяет владельцев питомцев, локальную ленту и полезную
          городскую инфраструктуру.
        </p>
        <PlatformEntry telegramBotUsername={telegramBotUsername} />
        <TelegramAuthBootstrap />
      </header>

      <section aria-labelledby="capabilities-title" className="capabilities">
        <div className="section-heading">
          <p className="eyebrow">Основа продукта</p>
          <h2 id="capabilities-title">Практическая польза рядом</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <article className="capability" key={capability.title}>
              <span aria-hidden="true" className="capability-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="foundation-note" aria-label="Статус разработки">
        <span aria-hidden="true" className="status-dot" />
        <p>
          Стартовая витрина уже доступна на GitHub Pages. Полный сценарий с лентой,
          профилем и публикациями открывается через Telegram Mini App.
        </p>
      </aside>
    </div>
  );
}
