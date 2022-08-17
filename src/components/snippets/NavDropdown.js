import Link from "next/link";
import { useRouter } from "next/router";

export default function NavDropdown() {
  const router = useRouter();
  const currentRoute = router.query.collection
    ? `/collections/${router.query.collection.toLowerCase()}`
    : "";

  const navLinks = [
    { name: "Boots", link: "/collections/boots" },
    { name: "Sandals", link: "/collections/sandal" },
    { name: "Men", link: "/collections/mens" },
    { name: "Baby", link: "/collections/baby" },
  ];

  return (
    <ul className="items-center hidden gap-8 ml-12 md:flex">
      {navLinks.map((item) => {
        return (
          <li
            className={
              currentRoute == item.link.toLowerCase()
                ? "border-b-2 border-black "
                : ""
            }
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
