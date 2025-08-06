import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'

export function NavBar() {
  return (
    <nav className="sticky top-0 left-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
    </nav>
  )
}
