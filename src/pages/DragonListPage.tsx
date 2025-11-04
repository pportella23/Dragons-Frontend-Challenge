import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { type Dragon } from "../types/dragon";
import { deleteDragon, getDragons } from "../services/dragonService";
import { Button } from "../components/common/Button/Button";
import styles from "./DragonListPage.module.scss";

function DragonListPage() {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDragons = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDragons();
      setDragons(data);
    } catch (err) {
      setError("Falha ao carregar a lista de dragões.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDragons();
  }, []);

  const sortedDragons = useMemo(() => {
    return [...dragons]
      .filter((dragon) => dragon.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [dragons]);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja deletar o dragão "${name}"?`)) {
      return;
    }
    try {
      await deleteDragon(id);
      setDragons((prevDragons) =>
        prevDragons.filter((dragon) => dragon.id !== id)
      );
      alert(`Dragão "${name}" deletado com sucesso!`);
    } catch (err) {
      alert("Erro ao deletar o dragão. Tente novamente.");
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando lista de dragões...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}
        <Button onClick={fetchDragons} variant="primary">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (sortedDragons.length === 0) {
    return (
      <div className={styles.empty}>
        Nenhum dragão encontrado.
        <Link to="/dragons/create">
          <Button variant="primary">Cadastrar Novo Dragão</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Lista de Dragões</h1>
        <Link to="/dragons/create">
          <Button variant="primary">Cadastrar Novo Dragão</Button>
        </Link>
      </header>

      <ul className={styles.dragonList}>
        {sortedDragons.map((dragon) => (
          <li key={dragon.id} className={styles.dragonItem}>
            <div className={styles.dragonInfo}>
              <h2 className={styles.dragonName}>
                <Link to={`/dragons/${dragon.id}`}>{dragon.name}</Link>
              </h2>
              <p className={styles.dragonType}>Tipo: {dragon.type}</p>
            </div>
            <div className={styles.actions}>
              <Link to={`/dragons/edit/${dragon.id}`}>
                <Button variant="secondary">Editar</Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => handleDelete(dragon.id, dragon.name)}
              >
                Deletar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragonListPage;
