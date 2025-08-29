// object types
import audioSchema from './audio'
import textBlockSchema from './textBlock'
import personSchema from './person'
import {twoColumnBlock} from './twoColumnBlock'

// document types
import eventsSchema from './events'
import aboutSchema from './about'
import eventsTypeSchema from './eventsType'
import globalColorSchema from './globalColor'
import datenschutzSchema from './datenschutz'

const schemaTypes = [
  audioSchema,
  textBlockSchema,
  personSchema,
  eventsSchema,
  aboutSchema,
  eventsTypeSchema,
  globalColorSchema,
  datenschutzSchema,
  twoColumnBlock,
]

export default schemaTypes
