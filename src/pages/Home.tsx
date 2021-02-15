import React, { useCallback, useState, useEffect } from 'react';
import { FiTrash, FiTrash2, FiSquare, FiXSquare, FiEdit3, FiMenu } from 'react-icons/fi';

import {
  Container,
  Title,
  Form,
  InputGroup,
  Card,
  CardContent,
  Button,
  FormControl,
  ListGroup,
  ListGroupItem,
  Badge,
  TaskTitle,
  Alert,
  ButtonsGroup,
  Dropdown
} from '../styles/pages/Home';
import ITask from '../utils/ITask';
import TaskAdding from '../components/TaskAdding';

function Home() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const storage = localStorage.getItem("ToDoList/tasks");
    if (storage !== null) {      
      setTaskList(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ToDoList/tasks", JSON.stringify(taskList));
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

  const handleDeleteAll = useCallback(() => {
    setShow(false);
    setTaskList([]);
    localStorage.removeItem("ToDoList/tasks");
  }, []);

  const handleEdit = useCallback((index) => {
    const copy = [...taskList];
    copy[index].edit = !copy[index].edit;
    setTaskList(copy);
    setId(index);
  }, [taskList]);

  const handleEditFinish = useCallback((event) => {
    event.preventDefault();
    const copy = [...taskList];
    const fullDate = new Date();
    const date = fullDate.toLocaleDateString('br');
    const time = fullDate.toLocaleTimeString('br');
    const input: ITask = {
      title: event.target[0].value,
      status: false,
      edit: false,
      lastEditAt: `${date} - ${time}`
    }

    copy[id] = input;
    setTaskList(copy);
  }, [taskList, id]);

  return (
    <Container>
      <Title>To-Do List</Title>

      <TaskAdding 
        taskList={taskList}
        setTaskList={setTaskList} 
      />

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

      <Card>
        <Card.Header>
          <CardContent>
            <p>
              Lista de tarefas
            </p>
            {taskList.length > 0 ? (
              <Button variant="danger" onClick={() => setShow(true)}>
                <FiTrash size={20} color={'#fff'} />
              </Button>
            ) : ('')}
          </CardContent>
        </Card.Header>

        <ListGroup variant="flush" >
          {taskList && (taskList.map((task, index) => (
            <ListGroupItem key={index}>
              {task.edit ?
                <Form onSubmit={handleEditFinish}>
                  <InputGroup>
                    <FormControl
                      placeholder={task.title}
                      aria-label={task.title}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button
                        type="submit"
                        variant="outline-info"
                      >
                        Alterar
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
                : <TaskTitle
                  style={task.status ? { textDecoration: 'line-through' } : {}}
                >
                  {task.title}
                  <br />
                  Última modificação:
                  <br />
                  {task.lastEditAt}
                </TaskTitle>}

              {!task.edit &&
                (<div>
                  <ButtonsGroup>
                    <Button
                      variant="info"
                      onClick={() => handleEdit(index)}
                    >
                      <FiEdit3 size={20} color={'#fff'} />
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleStatus(index)}
                    >
                      {task.status ?
                        <FiXSquare size={20} color={'#fff'} /> :
                        <FiSquare size={20} color={'#fff'} />
                      }
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      <FiTrash2 size={20} color={'#fff'} />
                    </Button>

                  </ButtonsGroup>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      <FiMenu size={20} color={'#fff'} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleEdit(index)}
                      >
                        Editar
                        </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleStatus(index)}
                      >
                        Concluir
                        </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleDelete(index)}
                      >
                        Excluir
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>)}
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
