import HeaderMenu from "./HeaderMenu";

export default function PageWrapper({ children }) {
  return (
    <div className="page-wrapper">
      <h1>Asparagus Magazine</h1>
      <HeaderMenu />
      {children}
    </div>
  );
}
