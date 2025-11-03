import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import styles from "./LoginForm.module.scss";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Acesso ao Desafio Dragões</h2>

      {error && <p className={styles.error}>{error}</p>}

      <Input
        label="Nome de Usuário"
        type="text"
        placeholder="user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        label="Senha"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="primary">
        Entrar
      </Button>

      <p className="styles.hint">Credenciais de teste: user / 123</p>
    </form>
  );
};
