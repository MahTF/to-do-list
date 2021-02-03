import React, { useCallback, useState } from 'react';

import {
  Container,
  Title,
  Form,
  InputGroup,
  Card,
  Button,
  FormControl,
  ListGroup,
  ListGroupItem,
  Badge,
  TaskTitle
} from '../styles/pages/Home';

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
    <Container>
      <Title>To-Do List</Title>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
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

      <Card>
        <Card.Header>Lista de tarefas</Card.Header>
        <ListGroup variant="flush" >
          {taskList && (taskList.map((task, index) => (
            <ListGroupItem key={index}>
              <TaskTitle
                style={task.status ? { textDecoration: 'line-through' } : {}}
              >
                {task.title}
              </TaskTitle>
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
            </ListGroupItem>
          )))}
          <ListGroup.Item >
            Atualmente com <Badge pill variant="info">{taskList.length}</Badge> tarefas cadastradas.
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container >
  );
}

export default Home;
