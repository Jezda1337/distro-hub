import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/Button"

export default function DropdownMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (!menuRef.current?.contains(e.target as HTMLElement)) {
          setOpen(false)
        }
      },
      true
    )
  }, [])

  return (
    <div
      tabIndex={0}
      ref={menuRef}
      className="relative">
      <Button onClick={() => setOpen(!open)}>
        {!open ? (
          <Bars3BottomRightIcon className="h-6 w-6" />
        ) : (
          <XMarkIcon className="h-6 w-6" />
        )}
      </Button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ scale: 0, originX: "100%", originY: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            tabIndex={0}
            className="absolute right-0 z-10 mt-3 min-w-[200px] rounded border bg-white shadow">
            <ul
              className="py-2"
              tabIndex={0}>
              <li className="border-b px-5 pb-2">
                <p className="font-medium">Menu</p>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link
                  className="block px-5 py-2 hover:bg-black hover:text-white"
                  href={"/waiting-list"}>
                  Waiting list
                </Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link
                  className="block px-5 py-2 hover:bg-black hover:text-white"
                  href={"/about"}>
                  About
                </Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link
                  className="block px-5 py-2 hover:bg-black hover:text-white"
                  href={"/auth/login"}>
                  Admin login
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
