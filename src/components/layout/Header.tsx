import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button/Button";
import styles from "./Header.module.scss";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          Desafio Dragões
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/dragons" className={styles.navLink}>
          Lista
        </Link>
        <Link to="/dragons/create" className={styles.navLink}>
          Cadastrar Novo
        </Link>
      </nav>

      <Button onClick={handleLogout} variant="secondary">
        Sair
      </Button>
    </header>
  );
}

export default Header;
