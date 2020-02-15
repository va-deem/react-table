import React from 'react';
import { Card, CardBody, CardText, CardTitle, Input, Label } from 'reactstrap';

const PersonCard = (props) => {
  const { person, address } = props;
  return (
    <Card className="card bg-light mb-3">
      <CardBody>
        <CardTitle>
          Выбран пользователь:
          {' '}
          <b>
            {person.firstName}
            {' '}
            {person.lastName}
          </b>
        </CardTitle>
        <CardText>
          <Label for="exampleText">Описание:</Label>
          <Input type="textarea" name="text" id="exampleText" value={person.description} rows="3" />
          Адрес проживания:
          {' '}
          <b>{address && address.streetAddress}</b>
          <br />
          Город:
          {' '}
          <b>{address && address.city}</b>
          <br />
          Провинция/штат:
          {' '}
          <b>{address && address.state}</b>
          <br />
          Индекс:
          {' '}
          <b>{address && address.zip}</b>
          <br />
        </CardText>
      </CardBody>
    </Card>
  );
};


export default PersonCard;
