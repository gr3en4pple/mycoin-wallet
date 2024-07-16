import SearchAddress from '../components/SearchAddress'

export default function BlockExplorerLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full text-center space-y-6">
        <SearchAddress />
        {children}
      </div>
    </section>
  )
}
