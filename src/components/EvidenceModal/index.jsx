import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

export default function EvidenceModal({
    show,
    handleSubmitEvidence,
    handleCloseModal,
    handleRedirect,
    transacting,
    success,
    error,
    errorText,
    title,
    successText,
    sendTransactionText,
    input,
    setInput
}) {

    const handleInput = async (e) => {
        await setInput(input => {
            input = e.target.value;
            return input;
        });
    }

    return (
        <Modal show={show} onHide={handleCloseModal} className={"d-flex"}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {transacting && <Spinner animation="border" className="mx-auto" />}
            {success &&
                <Modal.Body>
                    <div>{successText}</div>
                </Modal.Body>}
            {error &&
                <Modal.Body>
                    <div>There was an error with your transaction!</div>
                    <div>{error && errorText}</div>
                </Modal.Body>}
            {<Modal.Body>
                <div className="col">
                    <Form>
                        <Form.Group controlId="evidenceText">
                            <Form.Label>Evidence text</Form.Label>
                            <Form.Control
                                value={(input)}
                                onChange={handleInput}
                                as="textarea"
                                custom
                                style={{width: "100%", height: "450px"}}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>}
            <Modal.Footer>
                {(!transacting && !error && !success) &&
                    <div>
                        <Button variant="secondary" onClick={handleSubmitEvidence}>
                            {sendTransactionText}
                        </Button>
                    </div>}
                {(!transacting && success) &&
                    <div>
                        <Button variant="danger" onClick={handleRedirect}>
                            Go to the Events Page
                        </Button>
                    </div>}
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                {error && <Button variant="secondary" onClick={handleSubmitEvidence}>
                    Try again
          </Button>}
            </Modal.Footer>
        </Modal>
    )
}
