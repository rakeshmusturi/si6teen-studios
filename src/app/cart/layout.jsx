// Private pages: keep them out of Google
export const metadata = { title: "Cart", robots: { index: false, follow: false } };
export default function Layout({ children }) { return children; }
