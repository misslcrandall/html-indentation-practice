import Image from 'next/image';

export default function Logo() {
  return (
    <Image
        src="/the-bookshelf-dev.svg"
        width={32}
        height={32}
        className=""
        alt="TheBookshelfDev Logo"
    />
  );
}
