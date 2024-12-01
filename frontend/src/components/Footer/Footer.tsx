import React from "react";
import "./Footer.css";
import { FooterProps, useFooter } from "./useFooter";

const Footer: React.FC = (props: FooterProps) => {
  const {} = useFooter(props);
  return (
    <div className="footer">
      <p>
        © 2024{" "}
        <a
          href="https://yaakoub-chaker-bteit.web.app/"
          target="_blank"
          rel="noreferrer"
        >
          Chaker Yaakoub
        </a>{" "}
        All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
