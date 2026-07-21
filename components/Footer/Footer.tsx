import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <span>
          &copy; {new Date().getFullYear()} NoteHub. All rights reserved.
        </span>
        <a href="https://goit.global/" target="_blank" rel="noreferrer">
          GoIT School
        </a>
      </div>
    </footer>
  );
}
