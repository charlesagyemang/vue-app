import EventService from '@/services/EventService'

export const namespaced = true

export const state = {

  events: [],
  eventsTotal: 0,
  currentDataCount: 0,
  event: {},

}

export const mutations = {

  ADD_EVENT(state, event){
    state.events.push(event)
  },

  SET_EVENTS(state, events){
    state.events = events
  },

  SET_EVENTS_TOTAL(state, eventsTotal){
    state.eventsTotal = eventsTotal
  },

  SET_CURRENT_DATA_COUNT(state, count){
    state.currentDataCount = count
  },

  SET_EVENT(state, event){
    state.event = event
  },

}

export const actions = {

  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
      const notification = {
        type: 'success',
        message: 'Your Event has Been Created!'
      }
      dispatch('notification/add', notification, {root: true})
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, {root: true})
      throw error
    })
  },

  fetchEvents({ commit, dispatch }, { perPage, page }){
    EventService.getEvents(perPage, page)
    .then((response) => {
      commit('SET_EVENTS_TOTAL', response.data.count)
      commit('SET_EVENTS', response.data.rows)
      commit('SET_CURRENT_DATA_COUNT', response.data.rows.length)
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching events: ' + error.message
      }
      dispatch('notification/add', notification, {root: true})
    })
  },

  fetchEventById({ commit, getters, dispatch }, id ){

    const event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
      .then((response) => {
        commit('SET_EVENT', response.data)
        return response.data
      }).catch((err) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event: ' + error.message
        }
        dispatch('notification/add', notification, {root: true})
      });
    }
  }

}

export const getters = {

  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }

}
