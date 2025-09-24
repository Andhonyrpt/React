import NavBar from "./NavBar";
import StatusBar from "./StatusBar";
import './Layout.css';

export default function Layout({ children }) {
  return (
  <div className="layout">
    <header>
      <NavBar />
      <StatusBar />
    </header>
    <main>
      {children}
    </main>
  </div>);
}