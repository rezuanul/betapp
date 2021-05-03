import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Input from '../../components/form/Input';
import Label from '../../components/form/Label';
import Textarea from '../../components/form/Textarea';
import PageCover from '../../components/Layout/PageCover';

export default function CreateBet() {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRedirect = () => {
    setShow(false);
    history.push('/match/football');
  };

  const initialValues = {
    description: '',
    amount: '',
    publicId: '',
    privateKey: '',
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required('Description is required'),
    amount: yup.string().required('Amount is required'),
    publicId: yup.string().required('Public ID is required'),
    privateKey: yup.string().required('Private Key is required'),
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
      <PageCover leagueName="La Liga" team1="Barcelona" team2="Real Madrid" />

      <div className="mt-5 container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h3>Create Bet</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="bet-amount">Bet Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  id="bet-amount"
                  onChange={handleChange}
                  value={values.amount}
                  error={errors.amount}
                  touched={touched.amount}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="ether-public-id">Ether Public Id</Label>
                <Input
                  type="text"
                  name="publicId"
                  id="ether-public-id"
                  onChange={handleChange}
                  value={values.publicId}
                  error={errors.publicId}
                  touched={touched.publicId}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="ether-private-id">Ether Private Id</Label>
                <Input
                  type="password"
                  name="privateKey"
                  id="ether-private-id"
                  onChange={handleChange}
                  value={values.privateKey}
                  error={errors.privateKey}
                  touched={touched.privateKey}
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
