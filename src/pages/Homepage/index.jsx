import React, { useState, Button } from 'react';
import Nav from 'react-bootstrap/Nav';
import { GiClick, GiCricketBat, GiTennisRacket } from 'react-icons/gi';
import { BiTrophy, BiFootball, BiBasketball, BiBaseball } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import EventTable from '../../components/EventTable';

export default function Homepage() {
  const [activeTab, setActiveTab] = useState('link-1');

  return (
    <div className="homepage">
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
          <Link to="/create-bet" className="btn btn-danger btn-block">
            Create Bet
          </Link>
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

                <EventTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
