import { STREAM_URL } from "@/utils/const";
import Image from "next/image";

const Navbar = () => (
  <nav
    className="navbar is-fixed-top is-dark has-text-centered"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: 8,
      paddingLeft: 8,
    }}
  >
    <div className="navbar-brand" style={{ padding: 6 }}>
      <Image src="/logo.png" width={50} height={40} alt="NPB Games" />
    </div>
    <div className="navbar-item">
      <a
        className="button is-primary is-dark"
        href={STREAM_URL}
        style={{ textDecoration: "none" }}
      >
        Pacific League Streams
      </a>
    </div>
  </nav>
);

export default Navbar;
