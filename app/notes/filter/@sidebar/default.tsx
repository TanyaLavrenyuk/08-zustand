import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = [
  { label: "All notes", value: "all" },
  { label: "Work", value: "Work" },
  { label: "Personal", value: "Personal" },
  { label: "Todo", value: "Todo" },
  { label: "Meeting", value: "Meeting" },
  { label: "Shopping", value: "Shopping" },
];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.menuList}>
          {" "}
          {TAGS.map((tag) => {
            const href =
              tag.value === "all"
                ? "/notes/filter/all"
                : `/notes/filter/${tag.value}`;
            return (
              <li key={tag.value} className={css.menuItem}>
                <Link href={href} className={css.menuLink}>
                  {tag.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
