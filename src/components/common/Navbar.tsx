import Image from "next/image";

const Navbar = () => (
  <nav
    className="navbar is-fixed-top has-text-centered"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid gray",
    }}
  >
    <div
      className="navbar-brand"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src="/logo.png" width={40} height={30} alt="NPB Games" />
    </div>
  </nav>
);

export default Navbar;
