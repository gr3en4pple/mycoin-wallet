import BlockExplorer from '../../components/BlockExplorer'

export default function Page({ params }: { params: { id: string } }) {
  return <BlockExplorer address={params?.id} />
}
