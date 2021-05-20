import React, { useState } from 'react';
import PageCover from '../../components/Layout/PageCover';
import Modal from '../../components/Modal';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Input from '../../components/form/Input';
import Label from '../../components/form/Label';
import Select from '../../components/form/Select';

import { categoryOptionsArray, countryOptionsArray } from '../../const/filterMappings';
import genMetaEvidence from '../../interaction/genMetaEvidence';

import { useQuery, gql } from '@apollo/client';

const LEAGUES_QUERY = gql`
  query getLeagues($country: Int, $category: Int) {
    leagues(where: {country: $country, category:$category}) {
      league
    }
}
`;

export default function CreateBet({ web3, betContract, account, filters, setFilters, archon, ipfsClient }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [creationSuccess, setSuccess] = useState(false);
  const [creating, setCreating] = useState(false);
  const [creationError, setError] = useState(false);


  const { loading, error, data, refetch } = useQuery(LEAGUES_QUERY, {
    variables: {
      country: parseInt(filters.country),
      category: parseInt(filters.category)
    },
    notifyOnNetworkStatusChange: true
  });

  const handleCloseModal = () => {
    setShow(false);
    setCreating(false);
    setSuccess(false);
    setError(false);
  }

  const handleRedirect = () => {
    setShow(false);
    history.push('/');
  };

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
    timeToVote: 24,
  };

  const validationSchema = yup.object().shape({
    event: yup.string().required('Event description is required')
      .max(80, 'Event description max length 80 characters!'),
    startDate: yup.date().required()
      .min(new Date(Date.now()).toISOString().slice(0, 10), "Date cannot be in the past!"),
    startTime: yup.string().required(), /// TODO Add check for time if date is today           FieldB: Yup.string()
    creatorBet: yup.string().required('Event description is required')                       //   .when('FieldA', {
      .max(80, 'Event description max length 80 characters!'),                               //       is: (FieldA) => FieldA.length > 0,
    stake: yup.number().min(1000000, 'Stake has to be bigger than 1000000')                  //       then: Yup.string()
      .required(),                                                                           //    .required('Field is required')            
    country: yup.string().required(),                                                        //})
    league: yup.string().max(30, "League max length 30 characters!"),
    category: yup.string().required(),
    odd: yup.number().min(1000001, 'Odd has to be bigger than 1000000')
      .required(),
    timeToVote: yup.number().min(24, 'Time to vote should be atleast one day!')
  });

  const getVotingDeadlineAsDateString = () => {
    let [year, month, day] = formikForm.values.startDate.split("-");
    let [hours, minutes] = formikForm.values.startTime.split(":");
    if (hours && minutes) {
      let startTimeAsUTC = Date.UTC(year, (parseInt(month) - 1).toString(), day, hours, minutes);
      let votingDeadlineAsDate = new Date(startTimeAsUTC + (formikForm.values.timeToVote * 3600000))
      return votingDeadlineAsDate.toISOString().slice(0, 16).replace('T', ' ');
    }
    return '';
  }

  const onSubmit = async () => {
    setCreating(true);
    setShow(true);
    setFilters({
      ...filters,
      league: formikForm.values.league,
      eventID: ''
    })
    let [year, month, day] = formikForm.values.startDate.split("-");
    let [hours, minutes] = formikForm.values.startTime.split(":");
    let dateTimeAsUTC = Date.UTC(year, (parseInt(month) - 1).toString(), day, hours, minutes);

    let metaEvidence = genMetaEvidence(account, '', formikForm.values.event + ' ' + new Date(dateTimeAsUTC).toISOString().slice(0, 10), formikForm.values.creatorBet);
    let fileObject = { content: JSON.stringify(metaEvidence) };

    let result;
    try {
      result = await ipfsClient.add(fileObject);
    } catch {
      handleRejected();
      return;
    }

    betContract.methods
      .createBet(formikForm.values.event,
        formikForm.values.creatorBet,
        formikForm.values.league,
        formikForm.values.country,
        formikForm.values.category,
        dateTimeAsUTC.toString().slice(0, -3),
        (formikForm.values.timeToVote * 3600),
        formikForm.values.odd, '/ipfs/' + result.path)
      .send({ from: account, value: formikForm.values.stake })
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
      <PageCover description={"Create a new Bet"} />
      <div className="mt-5 container">
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
                <Label htmlFor="country">Country</Label>
                <Select
                  type='select'
                  error={formikForm.errors.country}
                  onChange={e => {
                    formikForm.handleChange(e);
                    setFilters(filters => {
                      filters.country = e.target.value;
                      return filters;
                    });
                    refetch({
                      variables: {
                        category: parseInt(filters.category),
                        country: parseInt(filters.country)
                      }
                    });
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
                    setFilters(filters => {
                      filters.category = e.target.value;
                      return filters;
                    });
                    refetch({
                      variables: {
                        category: parseInt(filters.category),
                        country: parseInt(filters.country)
                      }
                    });
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
                  autoCompleteOptions={data && Array.from(data.leagues.map((league) => <option key={league.league}>{league.league}</option>))}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="creatorBet">I bet, that the following will happen:</Label>
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
                <Label htmlFor="stake" className="ml-3">In ETH: {formikForm.values.stake / 1000000000000000000}</Label>
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
                <Label htmlFor="yourProb" className="mr-3">Your Probability: {formikForm.values.odd > 1000000 && (1000000 / formikForm.values.odd).toFixed(6)}</Label>
                <Label htmlFor="backerProb" className="ml-2"> Backer Probability: {formikForm.values.odd > 1000000 && (1 - (1000000 / formikForm.values.odd).toFixed(6))}</Label>
                <Label
                  htmlFor="backerOdd"
                  className="ml-3">Backer Stake in ETH: {formikForm.values.odd > 1000000 &&
                    (((formikForm.values.stake * (formikForm.values.odd / 1000000)) - formikForm.values.stake) / 1000000000000000000).toPrecision(5)}</Label>
              </div>

              <div className="form-group">
                <Label htmlFor="timeToVote">Time to vote (In hours)</Label>
                <Input
                  type="number"
                  name="timeToVote"
                  id="timeToVote"
                  onChange={formikForm.handleChange}
                  value={formikForm.values.timeToVote}
                  error={formikForm.errors.timeToVote}
                  touched={formikForm.touched.timeToVote}
                />
                <Label htmlFor="timeToVote" className="ml-3">Voting will end on: {getVotingDeadlineAsDateString()}</Label>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-info">
                  Create Bet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        handleCloseModal={handleCloseModal}
        handleRedirect={handleRedirect}
        handleSucceeded={handleCloseModal}
        transacting={creating}
        success={creationSuccess}
        error={creationError}
        title={"Bet creation"}
        successText={"The bet was successfully created!"}
        successButtonText={"Close and create a new bet"} />
    </>
  );
}
