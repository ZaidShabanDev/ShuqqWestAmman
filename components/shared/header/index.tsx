import Link from "next/link";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
      >
        <img
          src="images/logo.png"
          alt="MyApp Logo"
          className="h-8 w-auto"
        />
      </Link>
    </header>
  );
};

export default Header;
