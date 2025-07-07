import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <div className="w-full h-14 bg-[#050927] flex items-center justify-between pl-4 m-0 border-b-2 border-white/20 shadow-lg">
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-full sm:-space-x-0">
        <NavigationMenu className='gap-2'>
          <NavigationMenuList className='flex gap-2'>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-white text-2xl hover:bg-transparent hover:text-white hover:underline hover:underline-offset-3" href="/">
                <span className="font-bold">MultiToolApp</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList className='flex gap-1 -space-x-1'>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-white text-lg hover:bg-transparent hover:text-white hover:underline hover:underline-offset-3 rounded-xl" href="/tasks">
                <span className="font-bold px-0.5">Tasks</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-white text-lg hover:bg-transparent hover:text-white hover:underline hover:underline-offset-3 rounded-xl" href="/clock">
                <span className="font-bold px-0.5">Clock</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-white text-lg hover:bg-transparent hover:text-white hover:underline hover:underline-offset-3 rounded-xl" href="/calendar">
                <span className="font-bold px-0.5">Calendar</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='sm:hidden'>
        <NavigationMenu>
          <NavigationMenuItem className='flex items-center'>
            <NavigationMenuTrigger className="bg-transparent w-16 py-2.5 px-1 text-white data-[state=open]:hover:bg-white/10 data-[state=open]:hover:text-white data-[state=open]:hover:underline data-[state=open]:hover:underline-offset-3">
              <Menu size={25} />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col bg-[#050927] border-0 text-white rounded-lg shadow-lg py-3 px-4 gap-1.5 w-40">
              <Link to='/tasks'><span className="text-white text-lg font-bold mb-2 hover:underline hover:underline-offset-3" >Tasks</span></Link>
              <Link to='/calendar'><span className="text-white text-lg font-bold mb-2 hover:underline hover:underline-offset-3" >Calendar</span></Link>
              <Link to='/clock'><span className="text-white text-lg font-bold mb-2 hover:underline hover:underline-offset-3" >Clock</span></Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>  
      <div className="flex items-center justify-end h-full gap-0 text-white">
        <Button variant="default" className="h-full text-md px-3 bg-transparent hover:bg-white hover:text-black border-l border-l-white/30 rounded-none transition-all duration-300 ease-in-out">
          <Link to="/signin">
            <span className="font-bold">Log in</span>
          </Link>
        </Button>
        <Button variant="default" className="h-full text-md px-3 bg-transparent hover:bg-white hover:text-black border-l border-l-white/30 rounded-none transition-all duration-300 ease-in-out">
          <Link to="/signup">
            <span className="font-bold">Sign up</span>
          </Link>
        </Button>
      </div>  
    </div>
  )
}
