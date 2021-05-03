import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import { FiShield } from 'react-icons/fi';
import { FaPeopleCarry } from 'react-icons/fa';
import { AiFillWechat } from 'react-icons/ai';
import { BsBook } from 'react-icons/bs';
import { GiClick, GiCricketBat, GiTennisRacket } from 'react-icons/gi';
import { ImStatsBars } from 'react-icons/im';
import { BiTrophy, BiFootball, BiBasketball, BiBaseball } from 'react-icons/bi';

import BetTable from '../../components/BetTable';

export default function Hompage() {
  const [activeTab, setActiveTab] = useState('link-1');

  return (
    <div className="homepage">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://via.placeholder.com/800x250?text=First+Slide"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://via.placeholder.com/800x250?text=Second+Slide"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://via.placeholder.com/800x250?text=Third+Slide"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <section className="feature-section container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="text-center">
              <h2 className="text-primary">BetApp Feature</h2>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
        </div>
        <div className="row margin-bottom-not-30">
          <div className="col-lg-4 col-sm-6">
            <div className="feature-item text-center">
              <div className="icon">
                <FiShield />
              </div>
              <h4 className="title">Safe &amp; Secure</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="feature-item text-center">
              <div className="icon">
                <FaPeopleCarry />
              </div>
              <h4 className="title">Training Mode</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="feature-item text-center">
              <div className="icon">
                <ImStatsBars />
              </div>
              <h4 className="title">Full Market Depth</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="feature-item text-center">
              <div className="icon">
                <BsBook />
              </div>
              <h4 className="title">Sports Book</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="feature-item text-center">
              <div className="icon">
                <GiClick />
              </div>
              <h4 className="title">Just a Click</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="feature-item text-center">
              <div className="icon">
                <AiFillWechat />
              </div>
              <h4 className="title">24x Live Chating</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bet-section mb-n5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center">
                <h2 className="text-primary">Bet & Play Now</h2>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="bet-tab">
                <Nav
                  className="justify-content-around"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => setActiveTab(selectedKey)}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">
                      <div className="icon">
                        <BiTrophy />
                        <span>All sports</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">
                      <div className="icon">
                        <BiFootball />
                        <span>football</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-3">
                      <div className="icon">
                        <GiCricketBat />
                        <span>cricket</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-4">
                      <div className="icon">
                        <GiTennisRacket />
                        <span>tennis</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-5">
                      <div className="icon">
                        <BiBasketball />
                        <span>basketball</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-6">
                      <div className="icon">
                        <BiBaseball />
                        <span>baseball</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <BetTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
