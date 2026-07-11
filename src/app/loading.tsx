export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Загрузка" className="page-state">
      <span className="loading-mark" />
      <p>Готовим Хвостократию…</p>
    </div>
  );
}
