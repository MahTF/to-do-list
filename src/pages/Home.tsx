import React, { useState, useEffect } from 'react';

import { Container, Title } from '../styles/pages/Home';
import ITask from '../utils/ITask';
import TaskAdding from '../components/TaskAdding';
import AlertDeleteAll from '../components/AlertDeleteAll';
import TaskCard from '../components/TaskCard';

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

  return (
    <Container>
      <Title>To-Do List</Title>

      <TaskAdding
        taskList={taskList}
        setTaskList={setTaskList}
      />

      <AlertDeleteAll
        show={show}
        setShow={setShow}
        setTaskList={setTaskList}
      />

      <TaskCard
        taskList={taskList}
        id={id}
        setShow={setShow}
        setTaskList={setTaskList}
        setId={setId}
      />
    </Container>
  );
}

export default Home;
