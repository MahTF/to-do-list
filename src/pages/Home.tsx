import React, { useCallback, useState } from 'react';
import { Card, Form, InputGroup, Button, FormControl, ListGroup } from 'react-bootstrap';

function Home() {
  const [taskList, setTaskList] = useState<String[]>([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const input = event.target[0];

    setTaskList([...taskList, input.value]);
    input.value = '';
    console.log(taskList);
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
        <Card.Header>Atividades</Card.Header>
        <ListGroup variant="flush" >
          <ListGroup.Item style={{ justifyContent: 'space-between', display: 'flex' }}>
            Atividade 1
            <div>
              <Button variant="primary">Concluir</Button>
              <Button variant="danger">Excluir</Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ justifyContent: 'space-between', display: 'flex' }}>
            Atividade 2
            <div>
              <Button variant="primary">Concluir</Button>
              <Button variant="danger">Excluir</Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ justifyContent: 'space-between', display: 'flex' }}>
            Atividade 3
            <div>
              <Button variant="primary">Concluir</Button>
              <Button variant="danger">Excluir</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Home;
