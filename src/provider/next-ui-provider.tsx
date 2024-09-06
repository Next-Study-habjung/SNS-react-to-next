import { NextUIProvider } from "@nextui-org/react"
export default function NextUiProvider({
  children,
  ...prop
}: {
  children: React.ReactNode
}) {
  return <NextUIProvider>{children}</NextUIProvider>
}
