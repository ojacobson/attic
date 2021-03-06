'use strict'

import React from 'react'
import classNames from 'classnames'
import keys from 'lodash.keys'

export const NEXT = 'next'
export const PREV = 'prev'

export default function OptionButtons({options, buttonClassName, value, onSelect}) {
  if (Array.isArray(options)) {
    options = options.reduce((opts, option) => ({
      ...opts,
      [option]: option,
    }), {})
  }

  return <div className="btn-group">
    {keys(options).map(option => (
      <button key={option}
        className={classNames(buttonClassName, {
          "btn": true,
          "btn-default": true,
          "active": value == option,
        })}
        onClick={() => onSelect(option)}>
        {options[option]}
      </button>
    ))}
  </div>
}
