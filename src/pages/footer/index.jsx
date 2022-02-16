import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:2000";

function Footer(props) {
  return (
    <div>
      <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6">
                <div class="footer-info">
                  <h3>Medicio</h3>
                  <p>
                    150 Patimura Street <br />
                    Jakarta Pusat 10110, Indonesia
                    <br />
                    <br />
                    <strong>Phone:</strong> +62 8123 4567 891
                    <br />
                    <strong>Email:</strong> info@example.com
                    <br />
                  </p>
                  <div class="social-links mt-3">
                    <a href="#" class="twitter">
                      <i class="bx bxl-twitter"></i>
                    </a>
                    <a href="#" class="facebook">
                      <i class="bx bxl-facebook"></i>
                    </a>
                    <a href="#" class="instagram">
                      <i class="bx bxl-instagram"></i>
                    </a>
                    <a href="#" class="google-plus">
                      <i class="bx bxl-skype"></i>
                    </a>
                    <a href="#" class="linkedin">
                      <i class="bx bxl-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="#">Home</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="#">About us</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="#">Services</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div
                class="col-lg-4 col-md-6 footer-newsletter"
                style={{ marginLeft: "20vw" }}
              >
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
      </footer>

      {/* <div id="preloader"></div> */}
      <a
        href="#"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}

export default Footer;
