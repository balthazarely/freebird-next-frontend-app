import Image from "next/image";

export default function PageHero() {
  return (
    // <div className="relative w-full h-96 ">

    <div className="relative w-full mb-24 h-96">
      <Image
        src="/hero-image.webp"
        layout="fill"
        objectFit="cover"
        alt="heroimage"
      />
    </div>
  );
}
