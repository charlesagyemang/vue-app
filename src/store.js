
import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    user: { id: 'GFrkaMf9eqLBJbJiE', name: 'Adam Jahr' },
    events: [],
    eventsTotal: 0,
    currentDataCount: 0,

  },

  mutations: {

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

  },

  actions: {

    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },

    fetchEvents({ commit }, { perPage, page }){
      EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS_TOTAL', response.data.count)
        commit('SET_EVENTS', response.data.rows)
        commit('SET_CURRENT_DATA_COUNT', response.data.rows.length)
      })
    }

  },

  getters: {

    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }

  }
})
