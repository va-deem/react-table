import React from 'react';
import { Form, Input, Label, Button } from 'reactstrap';

const AddPersonForm = (props) => {
  const { onSubmit, onChange, onClear, form, toggle } = props;
  return (
    <fieldset>
      <legend>Add new entry to the table</legend>
      <Form onSubmit={onSubmit}>
        <div className="form-group">
          <div className="form-row">
            <div className="form-group col-md-2">
              <Label htmlFor="inputId" className="col-form-label left-align">ID</Label>
              <Input
                type="text"
                name="id"
                onChange={onChange}
                value={form.id}
                className="form-control"
                id="inputId"
                placeholder="Enter ID"
                required
              />
            </div>
            <div className="form-group col-md-5">
              <Label htmlFor="firstNameInput" className="col-form-label">First name</Label>
              <input
                type="text"
                name="firstName"
                onChange={onChange}
                value={form.firstName}
                className="form-control"
                id="firstNameInput"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="form-group col-md-5">
              <Label htmlFor="lastName" className="col-form-label">Last name</Label>
              <Input
                type="text"
                name="lastName"
                onChange={onChange}
                value={form.lastName}
                className="form-control"
                id="lastName"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <Label htmlFor="email" className="col-form-label">Email</Label>
              <input
                type="email"
                name="email"
                onChange={onChange}
                value={form.email}
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-6">
              <Label htmlFor="phone" className="col-form-label">Phone</Label>
              <Input
                type="text"
                name="phone"
                onChange={onChange}
                value={form.phone}
                className="form-control"
                id="phone"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="form-buttons">
            <Button color="primary" type="submit">Add</Button>
            <Button color="secondary" onClick={onClear}>Clear</Button>
            <Button color="danger" onClick={toggle}>Close</Button>
          </div>
        </div>
      </Form>
    </fieldset>
  );
};

export default AddPersonForm;
