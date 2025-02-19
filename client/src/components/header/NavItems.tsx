import React from 'react'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { navItems } from "./list/navItems";

const NavItems = () => {
  return (
        <div className="flex-1 flex justify-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        {navItems.map((item, index) => (
                            <NavigationMenuItem
                                key={index}
                                className="pt-2 pb-0 pr-7 pl-7"
                            >
                                <a href={item.href}>{item.name}</a>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
  )
}

export default NavItems