import React, {useCallback} from 'react';

import {Form, InputGroup, FormControl, Button} from '../styles/pages/Home';
import ITask from '../utils/ITask';

type Props = {
  taskList: ITask[];
  setTaskList: Function;
}

function TaskAdding({taskList, setTaskList}: Props) {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const fullDate = new Date();
    const date = fullDate.toLocaleDateString('br');
    const time = fullDate.toLocaleTimeString('br');
    const input: ITask = {
      title: event.target[0].value,
      status: false,
      edit: false,
      lastEditAt: `${date} - ${time}`
    }
    
    setTaskList([...taskList, input]);
    event.target[0].value = '';
  }, [taskList, setTaskList]);

  return (
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
  );
}

export default TaskAdding;
