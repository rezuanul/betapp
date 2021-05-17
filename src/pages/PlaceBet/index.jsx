import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Select from '../../components/form/Select';
import PageCover from '../../components/Layout/PageCover';

const betData = [
  {
    id: 1,
    match: 'Barcelona vs Real Madrid',
    sport: 'football',
    country: 'England',
    bets: [
      {
        text: 'Barcelona will win',
      },
      {
        text: 'Real Madrid will win',
      },
      {
        text: 'Draw',
      },
    ],
  },
  {
    id: 2,
    match: 'Chelsea vs Manchestor United',
    sport: 'football',
    country: 'England',
    bets: [
      {
        text: 'Chelsea will win',
      },
      {
        text: 'Manchestor United will win',
      },
      {
        text: 'Draw',
      },
    ],
  },
  {
    id: 3,
    match: 'India vs Australia',
    sport: 'cricket',
    country: 'Australia',
    bets: [
      {
        text: 'India will win',
      },
      {
        text: 'Australia will win',
      },
      {
        text: 'Draw',
      },
    ],
  },
  {
    id: 4,
    match: 'Rafael vs Nadal',
    sport: 'tennis',
    bets: [
      {
        text: 'Rafael will win',
      },
      {
        text: 'Nadal United will win',
      },
      {
        text: 'Draw',
      },
    ],
  },
];

export default function CreateBet() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [bets, setBets] = useState(betData);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRedirect = () => {
    setShow(false);
    history.push('/match/football');
  };

  const initialValues = {
    country: '',
    sport: '',
  };

  const validationSchema = yup.object().shape({
    country: yup.string(),
    sport: yup.string(),
  });

  const onSubmit = (values) => {
    const { country, sport } = values;
    const filteredBets = betData.filter((bet) => {
      let obj;
      if (country !== '' && sport !== '') {
        obj = bet.country === country && bet.sport === sport;
      } else if (country !== '') {
        obj = bet.country === country;
      } else if (sport !== '') {
        obj = bet.sport === sport;
      } else {
        obj = bet;
      }
      return obj;
    });

    setBets(filteredBets);
  };

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <PageCover leagueName="La Liga" team1="Barcelona" team2="Real Madrid" />

      <div className="mt-5 container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h3>Place Bet</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <form onSubmit={handleSubmit} className="mb-3">
              <div className="row">
                <div className="col-lg-6">
                  <Select
                    name="country"
                    onChange={handleChange}
                    value={values.country}
                    error={errors.country}
                    touched={touched.country}
                  >
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>Australia</option>
                    <option>England</option>
                  </Select>
                </div>
                <div className="col-lg-6">
                  <Select
                    name="sport"
                    onChange={handleChange}
                    value={values.sport}
                    error={errors.sport}
                    touched={touched.sport}
                  >
                    <option value="">Select Sport</option>
                    <option value="football">Football</option>
                    <option value="cricket">Cricket</option>
                    <option value="tennis">Tennis</option>
                  </Select>
                </div>
              </div>
              <div className="text-center mt-3">
                <Button variant="danger" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {bets.map((bet) => (
              <Card key={`card_${bet.id}`} className="mb-3">
                <Card.Header>{bet.match}</Card.Header>
                <Card.Body>
                  {bet.bets.map((el, index) => (
                    <Button key={index} variant="danger" className="mr-2" onClick={handleShow}>
                      {el.text}
                    </Button>
                  ))}
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bet Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your bet has been successfully placed</Modal.Body>
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
