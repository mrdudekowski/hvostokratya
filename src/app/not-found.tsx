import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-state">
      <p className="eyebrow">404</p>
      <h1>Такой страницы пока нет</h1>
      <p>Вернитесь к началу Хвостократии.</p>
      <Link className="primary-button" href="/">
        На главную
      </Link>
    </div>
  );
}
