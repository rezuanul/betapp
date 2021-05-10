import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useFormik, yupToFormErrors } from 'formik';
import * as yup from 'yup';

import Input from '../../components/form/Input';
import Label from '../../components/form/Label';
import Textarea from '../../components/form/Textarea';
import Select from '../../components/form/Select';

export default function CreateBet() {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRedirect = () => {
    setShow(false);
    history.push('/event');
  };

  const countryOptions = [
    { value: 0, label: 'Switzerland' },
    { value: 1, label: 'Finland' },
    { value: 2, label: 'India' },
  ];

  const countryOptionsArray = [];
  countryOptions.map(option =>
    countryOptionsArray.push(<option label={option.label} value={option.value} key={option.value}></option>)
  );


  const categoryOptions = [
    { value: 0, label: 'Other' },
    { value: 1, label: 'Football' },
    { value: 2, label: 'Ice hockey' },
  ];

  const categoryOptionsArray = [];
  categoryOptions.map(option =>
    categoryOptionsArray.push(<option label={option.label} value={option.value} key={option.value}></option>)
  );

  const initialValues = {
    event: '',
    startDate: new Date().toISOString().slice(0, 10),
    startTime: '',
    creatorBet: 'Home wins',
    country: 0,
    category: 2,
    stake: 1000000000000000000,
    odd: 2000000,
    timeToVote: 84000,
  };

  const validationSchema = yup.object().shape({
    event: yup.string().required('Event description is required')
      .max(80, 'Event description max length 80 characters!'),
    startDate: yup.date().required()
      .min(new Date().toISOString().slice(0, 10), "Date cannot be in the past!"),
    creatorBet: yup.string().required('Event description is required')
      .max(80, 'Event description max length 80 characters!'),
    stake: yup.number().min(1000000, 'Stake has to be bigger than 1000000')
      .required(),
    country: yup.string().required(),
    league: yup.string().required(),
    category: yup.string().required(),
    odd: yup.number().min(1000001, 'Odd has to be bigger than 1000000')
      .required(),
    timeToVote: yup.number().min(84000, 'Time to vote should be atleast one day!')
  });

  const onSubmit = () => {
    handleShow();
    resetForm();
  };

  const { handleSubmit, values, handleChange, errors, touched, resetForm } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="mt-5 container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h3>Create a Bet</h3>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Label htmlFor="event">Event</Label>
                <Textarea
                  name="event"
                  id="event"
                  onChange={handleChange}
                  value={values.event}
                  error={errors.event}
                  touched={touched.event}
                />
              </div>


              <div className="form-group">
                <Label htmlFor="startDate">Event start date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  onChange={handleChange}
                  value={values.startDate}
                  error={errors.startDate}
                  touched={touched.stastartDateke}
                  min={values.startDate}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="startTime">Event start time (UTC)</Label>
                <Input
                  type="time"
                  name="startTime"
                  id="startTime"
                  onChange={handleChange}
                  value={values.startTime}
                  error={errors.startTime}
                  touched={touched.stastartTimeke}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="creatorBet">Your bet</Label>
                <Textarea
                  name="creatorBet"
                  id="creatorBet"
                  onChange={handleChange}
                  value={values.creatorBet}
                  error={errors.creatorBet}
                  touched={touched.creatorBet}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="country">Country</Label>
                <Select
                  type='select'
                  error={errors.country}
                  onChange={handleChange}
                  touched={touched.country}
                  name='country'
                  id='country'
                  className='select'
                  children={countryOptionsArray}
                  value={values.country}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="category">Category</Label>
                <Select
                  type='select'
                  error={errors.country}
                  onChange={handleChange}
                  touched={touched.country}
                  name='category'
                  id='category'
                  className='select'
                  children={categoryOptionsArray}
                  value={values.category}
                />
              </div>


              <div className="form-group">
                <Label htmlFor="stake">Stake</Label>
                <Input
                  type="number"
                  name="stake"
                  id="stake"
                  onChange={handleChange}
                  value={values.stake}
                  error={errors.stake}
                  touched={touched.stake}
                />
              </div>


              <div className="form-group">
                <Label htmlFor="odd">Your Odd</Label>
                <Input
                  type="number"
                  name="odd"
                  id="odd"
                  onChange={handleChange}
                  value={values.odd}
                  error={errors.odd}
                  touched={touched.odd}
                />
                <Label htmlFor="odd">Backer Odd: {values.odd > 1000000 && 1 / (1 - (1000000 / values.odd))}</Label>
              </div>

              <div className="form-group">
                <Label htmlFor="timeToVote">Time to vote (In seconds)</Label>
                <Input
                  type="number"
                  name="timeToVote"
                  id="timeToVote"
                  onChange={handleChange}
                  value={values.timeToVote}
                  error={errors.timeToVote}
                  touched={touched.timeToVote}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-danger">
                  Create Bet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bet Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your bet has been successfully created</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRedirect}>
            Go to Match Page
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
