import React, { useCallback } from 'react';
import { FiTrash, FiTrash2, FiSquare, FiXSquare, FiEdit3, FiMenu } from 'react-icons/fi';

import {
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
  ButtonsGroup,
  Dropdown
} from '../styles/pages/Home';
import ITask from '../utils/ITask';

type Props = {
  taskList: ITask[];
  id: number;
  setShow: Function;
  setTaskList: Function;
  setId: Function;
}

function TaskCard({ taskList, id, setShow, setTaskList, setId }: Props) {
  const handleStatus = useCallback(index => {
    const copy = [...taskList];
    copy[index].status = !copy[index].status;
    setTaskList(copy);
  }, [taskList, setTaskList]);

  const handleDelete = useCallback(index => {
    const copy = [...taskList];
    copy.splice(index, 1);
    setTaskList(copy);
  }, [taskList, setTaskList]);

  const handleEdit = useCallback((index) => {
    const copy = [...taskList];
    copy[index].edit = !copy[index].edit;
    setTaskList(copy);
    setId(index);
  }, [taskList, setTaskList, setId]);

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
  }, [taskList, id, setTaskList]);

  return (
    <Card>
      <Card.Header>
        <CardContent>
          <p>
            Lista de tarefas
            </p>
          {taskList.length > 1 ? (
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
  );
}

export default TaskCard;
