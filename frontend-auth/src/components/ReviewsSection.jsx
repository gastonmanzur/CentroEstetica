import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', comment: '' });

  // Obtener las últimas 10 reseñas del backend
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Error al obtener reseñas:', err));
  }, []);

  // Manejar el envío del formulario para una nueva reseña
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews((prevReviews) => [data, ...prevReviews].slice(0, 10));
        setShowModal(false);
        setNewReview({ name: '', comment: '' });
      })
      .catch((err) => console.error('Error al enviar reseña:', err));
  };

  return (
    <div className="reviews-section">
      <h2>Reseñas de nuestros clientes</h2>
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={5000}>
        {reviews.map((review, index) => (
          <div key={index} className="review-slide">
            <p>{review.comment}</p>
            <h5>- {review.name}</h5>
          </div>
        ))}
      </Carousel>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Deja tu reseña
      </Button>

      {/* Modal para nueva reseña */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deja tu reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Reseña</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu reseña"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewsSection;
