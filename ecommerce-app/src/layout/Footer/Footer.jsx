import "./Footer.css";

export default function () {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Conoce playerasla10.com</h3>
                        <ul>
                            <li>Acerca de nosotros</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Atención al cliente</h3>
                        <ul>
                            <li>Centro de Ayuda</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Mi cuenta</h3>
                        <ul>
                            <li>Mi cuenta</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Síguenos</h3>
                        <ul>
                            <li><a href="/">Instagram</a></li>
                            <li><a href="/">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>&copy;{new Date().getFullYear()} playerla10.com Todos los derechos reservados</span>
                    <nav>
                        <a href="/privacy">Política de Privacidad</a>
                        <a href="/terms">Términos y Condiciones</a>
                        <a href="/cookies">Cookies</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
};