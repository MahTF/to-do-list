import styled from 'styled-components';
import {
  Form as BForm,
  InputGroup as BInputGroup,
  Button as BButton,
  FormControl as BFormControl,
  ListGroup as BListGroup,
  Card as BCard,
  Badge as BBadge
} from 'react-bootstrap';


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  padding: 0;
`;

export const Title = styled.h1`
  font-size: 5vh;
  font-style: bold;
`;

export const Form = styled(BForm)`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

export const InputGroup = styled(BInputGroup)`
  width: 100%;
`;

export const FormControl = styled(BFormControl)`
  width: 80%;
`;

export const Button = styled(BButton)``;

export const Card = styled(BCard)`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

export const ListGroup = styled(BListGroup)``;

export const ListGroupItem = styled(BListGroup.Item)`
  display: flex;
  justify-content: space-between;
`;

export const Badge = styled(BBadge)``;

export const TaskTitle = styled.p`
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
