import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/register">Registrarse</Link> | <Link to="/login">Iniciar Sesión</Link>
    </nav>
);

export default Navbar;
