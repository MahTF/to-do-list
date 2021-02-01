import React, { useCallback, useState } from 'react';
import { Card, Form, InputGroup, Button, FormControl, ListGroup, Badge } from 'react-bootstrap';

function Home() {
  const [taskList, setTaskList] = useState<string[]>([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const input = event.target[0];

    setTaskList([...taskList, input.value]);
    input.value = '';
  }, [taskList]);

  const handleDelete = useCallback(index => {
    const copy = [...taskList];
    copy.splice(index, 1);
    setTaskList(copy);
  }, [taskList]);

  return (
    <div>
      <h1>To-Do List</h1>

      <Form onSubmit={handleSubmit}>
        <InputGroup style={{ width: '40%' }} >
          <FormControl
            placeholder="Insira a tarefa"
            aria-label="Insira a tarefa"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button
              type="submit"
              variant="outline-primary"
            >Adicionar
          </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>

      <br />
      <br />

      <Card style={{ width: '40%' }}>
        <Card.Header>Lista de tarefas</Card.Header>
        <ListGroup variant="flush" >
          {taskList && (taskList.map((task, index) => (
            <ListGroup.Item
              style={{ justifyContent: 'space-between', display: 'flex' }}
              key={index}
            >
              {task}
              <div>
                <Button variant="primary">Concluir</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >Excluir</Button>
              </div>
            </ListGroup.Item>
          )))}
          <ListGroup.Item >
            Atualmente com <Badge pill variant="info">{taskList.length}</Badge> tarefas cadastradas.
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Home;
