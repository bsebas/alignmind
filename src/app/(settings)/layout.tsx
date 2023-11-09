import NavigationSettings from '@/components/settings/menu/navigation'
import { SidebarNav } from '@/components/settings/menu/sidebar-nav'
import { Separator } from '@/components/ui/separator'
// import { BellIcon, CreditCardIcon, UserIcon } from '@heroicons/react/24/solid'
import { CreditCardIcon, UserIcon } from '@heroicons/react/24/solid'

// import { PencilRulerIcon } from 'lucide-react'

const sidebarNavItems = [
  {
    title: 'Account',
    href: '/settings',
    icon: <UserIcon className="h-4 w-4 mr-2" />,
  },
  // {
  //   title: 'Appearance',
  //   href: '/settings/appearance',
  //   icon: <PencilRulerIcon className="h-4 w-4 mr-2" />,
  // },
  // {
  //   title: 'Notifications',
  //   href: '/settings/notifications',
  //   icon: <BellIcon className="h-4 w-4 mr-2" />,
  // },
  {
    title: 'Billing',
    href: '/settings/billing',
    icon: <CreditCardIcon className="h-4 w-4 mr-2" />,
  },
]

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col bg-background w-full">
      <NavigationSettings />
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and set account preferences.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
