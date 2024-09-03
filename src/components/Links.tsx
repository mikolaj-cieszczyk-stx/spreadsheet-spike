import { Link } from "@nextui-org/react";
import React from "react";

interface LinksProps {
  links: { npm: string; github: string; docs: string };
}

const Links: React.FC<LinksProps> = ({ links }) => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <ul>
        <li>
          <b>NPM:</b> <Link href={links.npm}>{links.npm}</Link>
        </li>

        <li>
          <b>Github:</b> <Link href={links.npm}>{links.github}</Link>
        </li>

        <li>
          <b>Docs:</b> <Link href={links.npm}>{links.docs}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Links;
