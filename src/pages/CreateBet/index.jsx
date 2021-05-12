import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Input from '../../components/form/Input';
import Label from '../../components/form/Label';
import Select from '../../components/form/Select';

import { useQuery, gql } from '@apollo/client';

import { countryOptions, categoryOptions } from '../../const/filterMappings'


const LEAGUES_QUERY = gql`
  query getLeagues {
    events(where: {category: 12, country: 186}) {
      league
    }
  }
`;

const countryOptionsArray = [];
countryOptions.map(option =>
  countryOptionsArray.push(<option label={option.label} value={option.value} key={option.value}></option>)
);

const categoryOptionsArray = [];
categoryOptions.map(option =>
  categoryOptionsArray.push(<option label={option.label} value={option.value} key={option.value}></option>)
);

export default function CreateBet({ web3, contract, account, setAccount, filters, setFilters }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [creationSuccess, setSuccess] = useState(false);
  const [creating, setCreating] = useState(false);
  const [creationError, setError] = useState(false);

  //const { loading, error, data } = useQuery(LEAGUES_QUERY);

  const handleCloseModal = () => {
    setShow(false);
    setCreating(false);
    setSuccess(false);
    setError(false);
  }

  const handleRedirect = () => {
    setShow(false);
    history.push('/event');
  };

  let leagueAutocompleteOptions = [];

  // const updateLeagueAutoCompleteOptions = async () => {
  //   if (!loading && !error) {
  //     leagueAutocompleteOptions = [];
  //     data.events.map(event => 
  //       leagueAutocompleteOptions.push(<option value={event.league}></option>)  
  //     );
  //   }
  // }

  const initialValues = {
    event: '',
    startDate: new Date(Date.now()).toISOString().slice(0, 10),
    startTime: '',
    creatorBet: 'Home wins',
    country: ((filters.country) ? filters.country : 0),
    category: ((filters.category) ? filters.category : 0),
    league: ((filters.league) ? filters.league : ''),
    stake: 1000000000000000000,
    odd: 2000000,
    timeToVote: 86401,
  };

  const validationSchema = yup.object().shape({
    event: yup.string().required('Event description is required')
      .max(80, 'Event description max length 80 characters!'),
    startDate: yup.date().required()
      .min(new Date(Date.now()).toISOString().slice(0, 10), "Date cannot be in the past!"),
    startTime: yup.string().required(), /// TODO Add check for time if date is today                FieldB: Yup.string()
    creatorBet: yup.string().required('Event description is required')                       //   .when('FieldA', {
      .max(80, 'Event description max length 80 characters!'),                               //       is: (FieldA) => FieldA.length > 0,
    stake: yup.number().min(1000000, 'Stake has to be bigger than 1000000')                  //       then: Yup.string()
      .required(),                                                                           //    .required('Field is required')            
    country: yup.string().required(),                                                        // })
    league: yup.string().max(30, "League max length 30 characters!"),
    category: yup.string().required(),
    odd: yup.number().min(1000001, 'Odd has to be bigger than 1000000')
      .required(),
    timeToVote: yup.number().min(86401, 'Time to vote should be over one day!')
  });

  const onSubmit = () => {
    setCreating(true);
    setShow(true);
    setFilters({
      ...filters,
      league: formikForm.values.league
    })
    let [year, month, day] = formikForm.values.startDate.split("-");
    let [hours, minutes] = formikForm.values.startTime.split(":");
    let dateTimeAsUTC = Date.UTC(year, (parseInt(month) - 1).toString(), day, hours, minutes);
    contract.methods
            .createBet(formikForm.values.event,
                       formikForm.values.creatorBet, 
                       formikForm.values.league,
                       formikForm.values.country,
                       formikForm.values.category,
                       dateTimeAsUTC.toString().slice(0, -3),
                       formikForm.values.timeToVote,
                       formikForm.values.odd)
            .send({from: account, value: formikForm.values.stake})
            .then((res) => handleBetCreated(), (res) => handleRejected())
  };

  const handleBetCreated = () => {
    setCreating(false);
    setSuccess(true);
  }

  const handleRejected = () => {
    setCreating(false);
    setError(true);
  }

  const handleCreateNew = () => {
    handleCloseModal();
    //formikForm.resetForm(); //player might want to create a bet on same event so don't reset form.
  }

  const formikForm = useFormik({
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
            <form onSubmit={formikForm.handleSubmit}>
              <div className="form-group">
                <Label htmlFor="event">Event</Label>
                <Input
                  type="text"
                  name="event"
                  id="event"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.event}
                  error={formikForm.errors.event}
                  touched={formikForm.touched.event}
                />
              </div>


              <div className="form-group">
                <Label htmlFor="startDate">Event start date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.startDate}
                  error={formikForm.errors.startDate}
                  touched={formikForm.touched.startDate}
                  min={new Date(Date.now()).toISOString().slice(0, 10)}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="startTime">Event start time (UTC)</Label>
                <Input
                  type="time"
                  name="startTime"
                  id="startTime"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.startTime}
                  error={formikForm.errors.startTime}
                  touched={formikForm.touched.startTime}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="creatorBet">Your bet</Label>
                <Input
                  type="text"
                  name="creatorBet"
                  id="creatorBet"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.creatorBet}
                  error={formikForm.errors.creatorBet}
                  touched={formikForm.touched.creatorBet}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="country">Country</Label>
                <Select
                  type='select'
                  error={formikForm.errors.country}
                  onChange={e => {
                    formikForm.handleChange(e);
                    setFilters({
                      ...filters,
                      country: e.currentTarget.value
                    })
                  }}
                  touched={formikForm.touched.country}
                  name='country'
                  id='country'
                  className='select'
                  children={countryOptionsArray}
                  value={formikForm.values.country}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="category">Category</Label>
                <Select
                  type='select'
                  error={formikForm.errors.category}
                  onChange={e => {
                    formikForm.handleChange(e);
                    setFilters({
                      ...filters,
                      category: e.currentTarget.value
                    })
                  }}
                  touched={formikForm.touched.category}
                  name='category'
                  id='category'
                  className='select'
                  children={categoryOptionsArray}
                  value={formikForm.values.category}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="league">League</Label>
                <Input
                  type="text"
                  name="league"
                  id="league"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.league}
                  error={formikForm.errors.league}
                  touched={formikForm.touched.league}
                  autoCompleteOptions={leagueAutocompleteOptions}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="stake">Stake</Label>
                <Input
                  type="number"
                  name="stake"
                  id="stake"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.stake}
                  error={formikForm.errors.stake}
                  touched={formikForm.touched.stake}
                />
              </div>


              <div className="form-group">
                <Label htmlFor="odd">Your Odd</Label>
                <Input
                  type="number"
                  name="odd"
                  id="odd"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.odd}
                  error={formikForm.errors.odd}
                  touched={formikForm.touched.odd}
                />
                <Label htmlFor="odd">Backer Odd: {formikForm.values.odd > 1000000 && 1 / (1 - (1000000 / formikForm.values.odd))}</Label>
              </div>

              <div className="form-group">
                <Label htmlFor="timeToVote">Time to vote (In seconds)</Label>
                <Input
                  type="number"
                  name="timeToVote"
                  id="timeToVote"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.timeToVote}
                  error={formikForm.errors.timeToVote}
                  touched={formikForm.touched.timeToVote}
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

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bet Creation</Modal.Title>
        </Modal.Header>
        {creating && <Spinner animation="border"/>}
        {creationSuccess && <Modal.Body>Your bet has been successfully created</Modal.Body>}
        {creationError && <Modal.Body>There was an error with your transaction!</Modal.Body>}
        <Modal.Footer>
          {(!creating && creationSuccess) && <Button variant="secondary" onClick={handleCreateNew}>
            Create a new bet
          </Button>}
          {creationError && <Button variant="secondary" onClick={handleCloseModal}>
            Close and try again
          </Button>}
          {!creating && <Button variant="danger" onClick={handleRedirect}>
            Go to Events Page
          </Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
