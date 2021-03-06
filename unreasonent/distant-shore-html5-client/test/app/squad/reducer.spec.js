'use strict'

import reducer from 'app/squad/reducer'
import * as actions from 'app/squad/actions'
import * as options from 'app/squad/character-options'

describe('app/squad/reducer', () => {
  it('generates an initial state', () => {
    var state = reducer(undefined, '//test-action')
    expect(state).to.have.property('characters').with.lengthOf(0)
  })

  var fromState = {
    workflow: {
      saving: false,
      loading: false,
    },
    characters: [
      {
        name: "Bob",
        archetype: "skirmisher",
        sprite: {
          hair: "1",
          hat: "0",
          outfit: "1",
          gender: "F",
        },
      },
    ],
  }

  it('generates a squad in response to a GENERATE_SQUAD', () => {
    var state = reducer(fromState, actions.generateSquad())
    expect(state).to.have.property('characters')
      .with.lengthOf(3)
    state.characters.map(character => {
      expect(character).to.have.property('name')
        .that.is.not.equal('')

      expect(character).to.have.property('sprite')
      expect(character.sprite).to.have.property('gender')
        .that.is.oneOf(options.GENDERS)
      expect(character.sprite).to.have.property('hair')
        .that.is.oneOf(options.HAIRS)
      expect(character.sprite).to.have.property('hat')
        .that.is.oneOf(options.HATS)
      expect(character.sprite).to.have.property('outfit')
        .that.is.oneOf(options.OUTFITS)
    })
  })

  it('changes character names', () => {
    var toState = reducer(fromState, actions.changeCharacterName(0, "Doug"))

    expect(toState).to.deep.equal({
      workflow: {
        saving: false,
        loading: false,
      },
      characters: [
        {
          name: "Doug",
          archetype: "skirmisher",
          sprite: {
            hair: "1",
            hat: "0",
            outfit: "1",
            gender: "F",
          },
        },
      ],
    })
  })

  it('changes character archetypes', () => {
    var toState = reducer(fromState, actions.changeCharacterArchetype(0, "hunter"))

    expect(toState).to.deep.equal({
      workflow: {
        saving: false,
        loading: false,
      },
      characters: [
        {
          name: "Bob",
          archetype: "hunter",
          sprite: {
            hair: "1",
            hat: "0",
            outfit: "1",
            gender: "F",
          },
        },
      ],
    })
  })

  it('updates character sprites', () => {
    var toState = reducer(fromState, actions.updateCharacterSprite(0, {
      hair: "2",
      hat: "1",
      outfit: "2",
      gender: "M",
    }))

    expect(toState).to.deep.equal({
      workflow: {
        saving: false,
        loading: false,
      },
      characters: [
        {
          name: "Bob",
          archetype: "skirmisher",
          sprite: {
            hair: "2",
            hat: "1",
            outfit: "2",
            gender: "M",
          },
        },
      ],
    })
  })

  it('partially updates character sprites', () => {
    var toState = reducer(fromState, actions.updateCharacterSprite(0, {
      hair: "2",
      gender: "M",
    }))

    expect(toState).to.deep.equal({
      workflow: {
        saving: false,
        loading: false,
      },
      characters: [
        {
          name: "Bob",
          archetype: "skirmisher",
          sprite: {
            hair: "2",
            hat: "0",
            outfit: "1",
            gender: "M",
          },
        },
      ],
    })
  })

  it('ignores updates to a nonexistant character', () => {
    var toState = reducer(fromState, actions.updateCharacterSprite(1, {
      hair: "2",
      hat: "1",
      outfit: "2",
      gender: "M",
    }))

    expect(toState).to.deep.equal(fromState)
  })
})
