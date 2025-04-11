import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ comment: '' });
  const userName = localStorage.getItem('userName') || '';
  const foto = localStorage.getItem('foto') || '';
  const token = localStorage.getItem('token');

  // Cargar reseñas
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Error al cargar reseñas:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Tenés que iniciar sesión para dejar una reseña.');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, comment: formData.comment, foto }),
      });

      const nueva = await res.json();
      setReviews((prev) => [nueva, ...prev].slice(0, 10));
      setShow(false);
      setFormData({ comment: '' });
    } catch (err) {
      alert('Error al enviar reseña');
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      {/* Carrusel principal */}
      <div id="carouselExampleControlsNoTouching" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="http://localhost:5000/uploads/carrusel1.jpeg" className="d-block w-100 img_carrusel" alt="Skincare 1" />
    </div>
    <div className="carousel-item">
      <img src="http://localhost:5000/uploads/carrusel2.jpeg" className="d-block w-100 img_carrusel" alt="Skincare 2" />
    </div>
    <div className="carousel-item">
      <img src="http://localhost:5000/uploads/carrusel3.jpeg" className="d-block w-100 img_carrusel" alt="Skincare 3" />
    </div>
  </div>
  {/* ✅ Controles de navegación */}
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Anterior</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Siguiente</span>
  </button>
</div>


      {/* Intro */}
      <section className="text-center py-5 bg-light">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Un enfoque único para tu bienestar
        </motion.h1>
        <p className="lead">Cuidado profesional de la piel y el cuerpo, adaptado a tus necesidades.</p>
        <button className="btn btn-dark mt-3">Reservar turno</button>
      </section>

      {/* Historia */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <img
              src="http://localhost:5000/uploads/nosotros.jpg"
              className="img-fluid rounded"
              alt="Nuestra historia"
            />
          </div>
          <div className="col-md-6">
            <h2>Nuestra historia</h2>
            <p>
              Desde 2005 nos dedicamos a acompañar a mujeres y hombres en su búsqueda de armonía y belleza.
              Con un enfoque basado en ciencia y sensibilidad, brindamos experiencias personalizadas que cuidan tu piel, tu mente y tu tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Nuestros Servicios</h2>
          <div className="row">
          {[
              { title: 'Limpieza profunda', img: 'http://localhost:5000/uploads/card_dash_1.png', description: 'xcnvkxlkñbdñvbñdj bñvBEÑVBDVBÑDSÑJ BÑFHbvjbdv sdc'},
              { title: 'Peeling con ácidos', img: 'http://localhost:5000/uploads/card_dash_2.png', description: 'zvnxcnbnadihqerginbaerf5454f5greablf{nbfabjfn {ofdb' },
              { title: 'Masajes relajantes', img: 'http://localhost:5000/uploads/card_dash_3.png', description: 'ds{jdb7ddsñNBB8SD7VDSVNDMBNÑAFNB{N{DVS55SDÑS' },
            ].map((service, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={service.img} className="card-img-top" alt={service.title} />
                  <div className="card-body">
                    <h5>{service.title}</h5>
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="container py-5 text-center">
        <h2 className="mb-4">Qué nos distingue</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="border p-3 rounded h-100">
              <h5>🔬 Basado en evidencia</h5>
              <p>Tratamientos respaldados por ciencia y experiencia clínica.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border p-3 rounded h-100">
              <h5>🌿 Productos orgánicos</h5>
              <p>Usamos cosmética consciente, segura y saludable.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border p-3 rounded h-100">
              <h5>💆 Atención personalizada</h5>
              <p>Escuchamos tus necesidades y diseñamos un plan a medida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Lo que dicen nuestras clientas</h2>

          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={6000}>
            {reviews.map((r, i) => (
              <div key={i}>
                <blockquote className="blockquote text-center">
                  {r.foto && (
                    <img
                      src={r.foto.startsWith('http') ? r.foto : `http://localhost:5000${r.foto}`}
                      alt="avatar"
                      className="rounded-circle mb-3 shadow"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  )}
                  <p>"{r.comment}"</p>
                  <footer className="blockquote-footer">{r.name}</footer>
                </blockquote>
              </div>
            ))}
          </Carousel>

          {token ? (
            <Button className="btn btn-dark mt-4" onClick={() => setShow(true)}>
              Dejá tu reseña
            </Button>
          ) : (
            <p className="mt-4 text-muted">Iniciá sesión para dejar tu reseña 💬</p>
          )}

          {/* Modal */}
          <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Dejá tu reseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tu comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ comment: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Enviar</Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </section>

      {/* Contacto */}
      <section className="container py-5 text-center">
        <h2 className="mb-3">¿Tenés preguntas o querés saber más?</h2>
        <p className="mb-3">Comunicate con nosotras por cualquiera de nuestros medios.</p>
        <div>
          <p><strong>📞</strong> (011) 1234-5678</p>
          <p><strong>✉️</strong> contacto@esteticas.com</p>
          <p><strong>📍</strong> Calle Belleza 123, Ciudad</p>
        </div>
      </section>
    </div>
  );
}
