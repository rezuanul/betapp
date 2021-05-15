import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function TransactionModal({ show, handleCloseModal, handleRedirect, handleSucceeded, transacting, success, error, title, successText }) {

    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            {transacting && <Spinner animation="border" />}
            {success && <Modal.Body>{successText}</Modal.Body>}
            {error && <Modal.Body>There was an error with your transaction!</Modal.Body>}
            <Modal.Footer>
                {(!transacting && success) && <Button variant="secondary" onClick={handleSucceeded}>
                    Create a new bet
          </Button>}
                {error && <Button variant="secondary" onClick={handleCloseModal}>
                    Close and try again
          </Button>}
                {!transacting && <Button variant="danger" onClick={handleRedirect}>
                    Go to Home Page
          </Button>}
            </Modal.Footer>
        </Modal>
    )
}