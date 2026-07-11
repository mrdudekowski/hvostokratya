# Хвостократия

Публичная витрина Telegram Mini App для GitHub Pages.

Сайт: https://mrdudekowski.github.io/hvostokratya/

## Что публикуется

- Стартовая страница с browser fallback
- Mobile-first shell и нижняя навигация
- Статическая сборка Next.js (`output: export`)

Полный backend, база данных, API и защищённые экраны в этом репозитории не разворачиваются — они остаются в локальной разработке.

## Локальная сборка Pages

```bash
pnpm install
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=hvostibot pnpm build:pages
```

Результат появится в каталоге `out/`.

## Деплой

Push в ветку `main` запускает workflow `.github/workflows/pages.yml` и публикует содержимое `out/` на GitHub Pages.
