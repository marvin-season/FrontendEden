export default function AccountLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div id="AccountLayout">
        {children}
      </div>
    );
  }
  