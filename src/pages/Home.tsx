import React, { useCallback, useState } from 'react';
import { Card, Form, InputGroup, Button, FormControl, ListGroup, Badge } from 'react-bootstrap';

interface Task {
  title: string;
  status: boolean;
}

function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const input: Task = { title: event.target[0].value, status: false }

    setTaskList([...taskList, input]);
    event.target[0].value = '';
  }, [taskList]);

  const handleStatus = useCallback(index => {
    const copy = [...taskList];
    copy[index].status = !copy[index].status;
    setTaskList(copy);
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
              <p style={task.status ? { textDecoration: 'line-through' } : {}}>
                {task.title}
              </p>
              <div>
                <Button
                  variant="primary"
                  onClick={() => handleStatus(index)}
                >Concluir</Button>
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
    </div >
  );
}

export default Home;
