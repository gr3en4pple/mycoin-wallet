import BlockCard from '../components/screens/Dashboard/BlockCard'
import LeftBar from '../components/screens/Dashboard/LeftBar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="h-full">
      <div className="flex justify-between h-full gap-10">
        <LeftBar />
        {children}
        <BlockCard />
      </div>
    </section>
  )
}
