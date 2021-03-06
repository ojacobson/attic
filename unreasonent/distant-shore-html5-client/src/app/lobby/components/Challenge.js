import React from 'react'
import { Link } from 'react-router'

module.exports = function Challenge() {
  return <div className="container">
    <h1>Challenge your friend</h1>
    <p>Social media buttons for posting the challenge here</p>
    <a href="https://twitter.com/share"
      className="twitter-share-button"
      data-text="I'm playing Distant Shore. Challenge me!">Tweet</a>
    <p>Or copy this link and share it yourself.</p>
    <hr />
    <ul>
      <li><Link to="/battle/123">move ahead to battle</Link></li>
      <li><Link to="/">abort and go back to landing</Link></li>
    </ul>
  </div>
}
