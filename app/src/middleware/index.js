import { toast } from 'react-toastify'
import { generateStore, EventActions } from 'drizzle'
import drizzleOptions from '../drizzleOptions'

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    console.log(action);
    const contract = action.name
    const contractEvent = action.event.event
    const message = JSON.stringify(action.event.returnValues);
    const display = `${contract}(${contractEvent}): ${message}`

    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}


const appMiddlewares = [ contractEventNotifier ]

const store = generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})

// Use the store with DrizzleProvider
export default store
