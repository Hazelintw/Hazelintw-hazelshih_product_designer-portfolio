"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur border-b">
      <Link href="/" className="font-bold text-lg">
        Portfolio
      </Link>
      <ul className="flex gap-6 text-sm">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={
                pathname === href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
