"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pendingItems = [
  { label: "Карта", glyph: "◇" },
  { label: "Чаты", glyph: "○" },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Основная навигация" className="bottom-navigation">
      <Link aria-current={pathname.startsWith("/feed") ? "page" : undefined} className="nav-item" href="/feed/nearby">
        <span aria-hidden="true" className="nav-glyph">
          ≋
        </span>
        Лента
      </Link>
      <Link aria-current={pathname === "/create/moment" ? "page" : undefined} className="nav-item" href="/create/moment">
        <span aria-hidden="true" className="nav-glyph">
          +
        </span>
        Создать
      </Link>
      {pendingItems.map((item) => (
        <button
          aria-label={`${item.label} — скоро`}
          className="nav-item"
          disabled
          key={item.label}
          type="button"
        >
          <span aria-hidden="true" className="nav-glyph">
            {item.glyph}
          </span>
          {item.label}
        </button>
      ))}
      <Link aria-current={pathname === "/profile" ? "page" : undefined} className="nav-item" href="/profile">
        <span aria-hidden="true" className="nav-glyph">
          ⌁
        </span>
        Профиль
      </Link>
    </nav>
  );
}
