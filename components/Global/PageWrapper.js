import HeaderMenu from "./HeaderMenu";
import Footer from "./footer";

export default function PageWrapper({ children }) {
  return (
    <div className="page-wrapper">
      <h1>Asparagus Magazine</h1>
      <HeaderMenu />
      {children}
      <Footer />
    </div>
  );
}
