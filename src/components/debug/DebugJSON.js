export default function DebugJSON({ json }) {
  return <section className="mt-7 p-2 border-2 rounded-md border-green-700/50 bg-green-100/40 font-medium">
    <code className="whitespace-pre-line">{JSON.stringify(json)}</code>
  </section>
}