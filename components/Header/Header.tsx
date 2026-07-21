"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      {/* Логотип зліва */}
      <Link
        href="/"
        className={css.headerLink}
        style={{ outline: "none", border: "none" }}
      >
        NoteHub
      </Link>

      <nav>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link
              href="/"
              className={css.navigationLink}
              style={pathname === "/" ? { fontWeight: "bold" } : undefined}
            >
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/notes/filter/all"
              className={css.navigationLink}
              style={
                pathname.startsWith("/notes")
                  ? { fontWeight: "bold" }
                  : undefined
              }
            >
              Notes
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}
