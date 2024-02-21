import ReduxProvider from "@/redux/reduxProvider";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
      <body >{children}</body>
      </ReduxProvider>
    </html>
  );
}
