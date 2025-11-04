import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "../components/auth/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss"; // Estilos específicos para a página

function LoginPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
