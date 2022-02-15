import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/css/style.css";
// import Axios from "axios";

function Register() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "assets/js/main.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <body>
        {/* <!-- ======= Top Bar ======= --> */}
        <div id="topbar" className="d-flex align-items-center fixed-top">
          <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
            <div className="align-items-center d-none d-md-flex">
              <i className="bi bi-clock"></i> Monday - Saturday, 8AM to 10PM
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-phone"></i> Call us now +1 5589 55488 55
            </div>
          </div>
        </div>

        {/* <!-- ======= Header ======= --> */}
        <header id="header" class="fixed-top">
          <div className="container d-flex align-items-center">
            <a href="index.html" class="logo me-auto">
              <img src="assets/img/logo.png" alt="" />
            </a>
            {/* <!-- Uncomment below if you prefer to use an image logo --> */}
            {/* <!-- <h1 class="logo me-auto"><a href="index.html">Medicio</a></h1> --> */}

            <nav id="navbar" className="navbar order-last order-lg-0">
              <ul>
                <li>
                  <a className="nav-link scrollto " href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#departments">
                    Departments
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#doctors">
                    Doctors
                  </a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Drop Down</span>{" "}
                    <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Drop Down 1</a>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        <span>Deep Drop Down</span>{" "}
                        <i className="bi bi-chevron-right"></i>
                      </a>
                      <ul>
                        <li>
                          <a href="#">Deep Drop Down 1</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 2</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 3</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 4</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 5</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 4</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
            {/* <!-- .navbar --> */}

            <a href="#appointment" className="appointment-btn scrollto">
              <span className="d-none d-md-inline">Make an</span> Appointment
            </a>
          </div>
        </header>
        {/* <!-- End Header --> */}

        <main id="main">
          {/* <!-- ======= Breadcrumbs Section ======= --> */}
          <section className="breadcrumbs">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <h2>Inner Page</h2>
                <ol>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>Inner Page</li>
                </ol>
              </div>
            </div>
          </section>
          {/* <!-- End Breadcrumbs Section --> */}

          <section className="inner-page">
            <div className="container">
              <p>Example inner page template</p>
            </div>
          </section>
        </main>
        {/* <!-- End #main --> */}

        {/* <!-- ======= Footer ======= --> */}
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="footer-info">
                    <h3>Medicio</h3>
                    <p>
                      A108 Adam Street <br />
                      NY 535022, USA
                      <br />
                      <br />
                      <strong>Phone:</strong> +1 5589 55488 55
                      <br />
                      <strong>Email:</strong> info@example.com
                      <br />
                    </p>
                    <div className="social-links mt-3">
                      <a href="#" className="twitter">
                        <i className="bx bxl-twitter"></i>
                      </a>
                      <a href="#" className="facebook">
                        <i className="bx bxl-facebook"></i>
                      </a>
                      <a href="#" className="instagram">
                        <i className="bx bxl-instagram"></i>
                      </a>
                      <a href="#" className="google-plus">
                        <i className="bx bxl-skype"></i>
                      </a>
                      <a href="#" className="linkedin">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 col-md-6 footer-newsletter">
                  <h4>Our Newsletter</h4>
                  <p>
                    Tamen quem nulla quae legam multos aute sint culpa legam
                    noster magna
                  </p>
                  <form action="" method="post">
                    <input type="email" name="email" />
                    <input type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Medicio</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              {/* <!-- All the links in the footer should remain intact. -->
      <!-- You can delete the links only if you purchased the pro version. -->
      <!-- Licensing information: https://bootstrapmade.com/license/ -->
      <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/medicio-free-bootstrap-theme/ --> */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}

        <div id="preloader"></div>
        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>

        {/* <!-- Vendor JS Files --> */}
        <script src="assets/vendor/purecounter/purecounter.js"></script>
        <script src="assets/vendor/aos/aos.js"></script>
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="assets/vendor/php-email-form/validate.js"></script>

        {/* <!-- Template Main JS File --> */}
        <script src="assets/js/main.js"></script>
      </body>
    </div>
  );
}

export default Register;
