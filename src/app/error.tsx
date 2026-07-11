"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-state" role="alert">
      <p className="eyebrow">Что-то пошло не так</p>
      <h1>Не удалось открыть экран</h1>
      <p>Попробуйте ещё раз. Ваши данные не изменились.</p>
      <button className="primary-button" onClick={reset} type="button">
        Повторить
      </button>
    </div>
  );
}
