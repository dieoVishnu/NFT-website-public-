import React from 'react';
import { Link } from 'react-router-dom'
import Countdown from "react-countdown";
import { Dropdown } from 'react-bootstrap';

const TopBar = () => {
  return    <div className="topbar">
                <div className="container">
                    <div className="topbar-inner flex">
                        <div className="menu-options flex">
                            <div className="ethereum">
                                <div id="ethereum" className="dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle className="btn-selector nolink" id="dropdown-basic">
                                            <span>USD</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <span>AED</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <span>USD</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <span>EUR</span>
                                        </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="english">
                                <div id="english" className="dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle className="btn-selector nolink" id="dropdown-basic">
                                            <span>BTC</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <span>ETH</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <span>FTM</span>
                                        </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="topbar-right flex">
                            {/* <span>New Product Coming Soon</span> */}
                            {/* <div className="countdown">
                                <Countdown date={Date.now() + 500000000}>
                                    <span>You are good to go!</span>
                                </Countdown>
                            </div> */}
                            <ul className="socical-icon flex">
                                <li><a href="https://www.facebook.com/imoodini" target="_blank" rel="noopener noreferrer" className="active"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href='https://www.instagram.com/imoodini' target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>;
};

export default TopBar;
