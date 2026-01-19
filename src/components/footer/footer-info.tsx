export function FooterInfo() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-gray-400/50 to-transparent dark:via-gray-600/50"
      />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Feito por{" "}
            <span className="font-medium">Pedro Andrade</span>
          </p>

          <nav aria-label="Créditos" className="flex items-center gap-3">
            <a
              href="https://github.com/peandrade"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600"
              aria-label="GitHub de Pedro Andrade"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 opacity-80">
                <path
                  fill="currentColor"
                  d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.23-3.24-.12-.3-.53-1.54.12-3.2 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.9.12 3.2.76.84 1.23 1.92 1.23 3.24 0 4.64-2.8 5.66-5.48 5.97.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.58A12 12 0 0 0 12 .5z"
                />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/pedro-andrade-santos/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-blue-200/60 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:border-blue-900/60 dark:text-blue-300 dark:hover:bg-blue-950/40 dark:focus-visible:ring-blue-600/60"
              aria-label="LinkedIn de Pedro Andrade"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 opacity-80">
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.55v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.35V9h3.4v1.56h.05c.47-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
          </nav>
        </div>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-500 text-center sm:text-left">
          © {year} PHstore • construído com Next.js + Tailwind
        </p>
      </div>
    </footer>
  );
}

export default FooterInfo;