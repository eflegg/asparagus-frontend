import HeaderMenu from "./HeaderMenu";
import Footer from "./footer";

export default function PageWrapper({ children }) {
  return (
    <div className="page-wrapper">
      <HeaderMenu />
      {children}
      <Footer />
    </div>
  );
}
