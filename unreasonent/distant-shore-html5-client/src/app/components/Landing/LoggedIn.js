import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import Copy from './Copy'

function LinkIf({enable, className, ...props}) {
  var classes = classNames(className, {
    disabled: !enable,
  })
  var Element = enable ? Link : 'div'
  return <Element className={classes} {...props} />
}

export default function LoggedIn({logout, lock, loading, squadNeeded}) {
  var enableGameCreate = !(loading || squadNeeded)

  return <div className="container">
    <div className="list-group col-md-4">
      <Link to="squad" className="list-group-item">
        <h2 className="list-group-item-heading">Edit your squad {/* trailing comment to retain whitespace */}
          {loading &&
            <small>
              <span className="glyphicon glyphicon-refresh" />
            </small>
          }
          {
            squadNeeded &&
            <small>
              ❗️
            </small>
          }
        </h2>
        <p className="list-group-item-text">
          Rebuild your squad and come back stronger than ever.
        </p>
      </Link>
      <LinkIf
        enable={enableGameCreate}
        className='list-group-item'
        to="/challenge/123">
        <h2 className="list-group-item-heading">Challenge a friend</h2>
        <p className="list-group-item-text">
          DIY normcore wayfarers godard, truffaut cold-pressed occupy forage.
        </p>
      </LinkIf>
      <LinkIf
        enable={enableGameCreate}
        className='list-group-item'
        to="/challenge/123">
        <h2 className="list-group-item-heading">Ranked battle</h2>
        <p className="list-group-item-text">
          Take on challengers to prove you're the best there is.
        </p>
      </LinkIf>
      <LinkIf
        enable={enableGameCreate}
        className='list-group-item'
        to="/challenge/123">
        <h2 className="list-group-item-heading">Practice battle</h2>
        <p className="list-group-item-text">
          Protect the land from rampaging monsters and practice with your squad.
        </p>
      </LinkIf>
      <button className="list-group-item" onClick={() => logout(lock)}>
        <h2 className="list-group-item-heading">Log out</h2>
        <p className="list-group-item-text">
          Protect your account when playing at internet cafés or on shared computers.
        </p>
      </button>
    </div>
    <div className="col-md-8">
      <Copy />
    </div>
  </div>
}
