import Image from "next/image";

export function SiteNavbar() {
  return (
    <header className="relative z-10 h-[76px] border-b border-[#e6ebf1] bg-transparent px-6">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <a
          href="#"
          aria-label="LUCI&CO home"
          className="flex h-full items-center leading-none"
        >
          <Image
            src="/luci-and-co-logo.svg"
            alt="LUCI&CO"
            width={625}
            height={93}
            priority
            className="block h-[26px] w-auto"
          />
        </a>
      </nav>
    </header>
  );
}
