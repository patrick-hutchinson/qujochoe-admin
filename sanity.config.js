import {defineConfig} from 'sanity';
import {visionTool} from '@sanity/vision';
import {internationalizedArray} from 'sanity-plugin-internationalized-array';
import schemas from './schemaTypes';
import {structureTool} from 'sanity/structure';
import {CalendarIcon, CogIcon, DocumentTextIcon, UsersIcon, BookIcon, DropIcon, TagsIcon} from '@sanity/icons';
import {QIcon} from './components/QIcon';
import {colorInput} from '@sanity/color-input';
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list';
import { fetchYears } from './fetchYears';

let years = [];
fetchYears().then((data) => {
  years = data;
});

export default defineConfig({
  name: 'default',
  title: 'Qujochoe Admin',
  icon: QIcon,
  projectId: 'h8ta33uq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Qujochoe Dashboard')
          .items([
            S.listItem()
              .title('Events')
              .icon(CalendarIcon)
              .child(
                S.list()
                  .title('Events by Year')
                  .items([
                    // "All Events" folder
                    // S.listItem()
                    //   .title('All Events')
                    //   .child(
                    //     S.documentList()
                    //       .title('All Events')
                    //       .filter('_type == "events"')
                    //       .defaultOrdering([{ field: 'date_time', direction: 'desc' }])
                    //   ),
                    // Dynamic list of events by unique years
                    ...years?.map(year =>
                      S.listItem()
                        .title(String(year))
                        .child(
                          S.documentList()
                            .title(`Events in ${year}`)
                            .filter('_type == "events" && date_time match $year')
                            .params({ year: `${year}` })
                            .defaultOrdering([{ field: 'date_time', direction: 'desc' }])
                        )
                    )
                  ])
              ),
            S.listItem()
              .title('About')
              .icon(DocumentTextIcon)
              .id('about')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
                  .title('About')
              ),
            S.listItem()
              .title('Datenschutz')
              .icon(BookIcon)
              .id('datenschutz')
              .child(
                S.document()
                  .schemaType('datenschutz')
                  .documentId('datenschutz')
                  .title('Datenschutz')
              ),

            // Divider
            S.divider(),

            // Global Settings Section
            S.listItem()
              .title('Global Settings')
              .id('globalSettings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Global Settings')
                  .items([
                    orderableDocumentListDeskItem({
                      type: 'events_type',
                      title: 'Event Types',
                      icon: TagsIcon,
                      S,
                      context
                    }),
                    S.documentTypeListItem('person')
                      .title('People')
                      .icon(UsersIcon),
                    S.documentTypeListItem('global_color')
                      .title('Global Colors')
                      .icon(DropIcon),
                  ])
              ),
          ])
    }),
    colorInput(),
    visionTool(),
    internationalizedArray({
      languages: [
        {id: 'de', title: 'Deutsch'},
        {id: 'en', title: 'English'},
      ],
      defaultLanguages: ['de'],
      fieldTypes: [
        'string',
        'text',
      ],
    })
  ],
  schema: {
    types: schemas,
  },
});
