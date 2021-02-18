import React, { useCallback } from 'react';

import { Alert, Button } from '../styles/pages/Home';

type Props = {
  show: boolean;
  setShow: Function;
  setTaskList: Function;
}

function AlertDeleteAll({ show, setShow, setTaskList }: Props) {
  const handleDeleteAll = useCallback(() => {
    setShow(false);
    setTaskList([]);
    localStorage.removeItem("ToDoList/tasks");
  }, [setShow, setTaskList]);

  return (
    <Alert show={show} variant="danger">
      <Alert.Heading>Atenção!</Alert.Heading>
      <p>
        Você tem certeza que deseja apagar toda a sua lista de tarefas?
        </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant="outline-info">
          Melhor não!
          </Button>
        <Button onClick={handleDeleteAll} variant="outline-danger">
          Confirmo, quero apagar!
          </Button>
      </div>
    </Alert>
  );
}

export default AlertDeleteAll;
