const {Password} = require("@keystonejs/fields");
const {CalendarDay} = require("@keystonejs/fields");
const { Keystone } = require('@keystonejs/keystone');
const { Text } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const PROJECT_NAME = 'keystoneapp';
const adapterConfig = { knexOptions: { connection: 'postgres://localhost/my-keystone-project', dropDatabase: true } };

// GrapeJs
const GrapesJSEditor = require('keystonejs-grapesjs-editor');

// Config
const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: 'dev',
});

// PageModel
keystone.createList('Page', {
  schemaDoc: 'Pages of the website',
  fields: {
    title: { type: Text, schemaDoc: 'The title of the page' },
    intro: { type: Text },
    content: {
      type: GrapesJSEditor, adminConfig: {
        "filePath": "uploads", // Public path for uploaded files(media) to be accessed by editor
        "css": [ // List of css files which need to be loaded on editor to show pages compatible with other pages
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
          'public/css/style.css'
        ],
        'js':[
            'https://code.jquery.com/jquery-3.3.1.slim.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        ],
        "staticFolderUrl": "/uploads/", // Static path for uploaded files(media) to be accessed by editor
        "apiUrl": "/media" // API url to upload media files by editor asset manager
      }
    },
  },
});


// TodoModel
keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
  },
});

// UserModel
keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    dob: {
      type: CalendarDay,
      format: 'do MMMM yyyy',
      dateFrom: '1901-01-01',
    },
    password: { type: Password },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true }),
  ],
};
