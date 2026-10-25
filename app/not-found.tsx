import Link from "next/link";

export default function NotFound() {
  return (
    <div className="stack py-10">
      <span className="label">Page not found</span>
      <h2>That page does not exist</h2>
      <p className="lede">The link may be mistyped. Head back to the home screen to pick up your journey.</p>
      <Link href="/" className="self-start rounded-xl border border-gospel bg-gospel px-4 py-3 font-label font-semibold text-surface no-underline">
        Back to home
      </Link>
    </div>
  );
}
