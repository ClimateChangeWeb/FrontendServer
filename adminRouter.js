const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');

// choose the data model to the admin page
const userModel = require('./models/user');
const charityModel = require('./models/charity');
const discoverModel = require('./models/discover');
const favIcon = require('./models/adminFavicon');

const databaseParent = {
  name: 'Data',
  icon: 'Document',
};
require('dotenv').config();

AdminBro.registerAdapter(AdminBroMongoose);

const locale = {
  translations: {
    labels: {
      // change Heading for Login
      loginWelcome: 'Climate Changes Admin',
    },
    messages: {
      loginWelcome:
        'Please use admin example and password to login. To gain access please contact our team. ',
    },
  },
};
const AdminBroOptions = {
  resources: [
    { resource: userModel, options: { navigation: databaseParent } },
    { resource: charityModel, options: { navigation: databaseParent } },
    { resource: discoverModel, options: { navigation: databaseParent } },
  ],
  preventAssignment: true,
  dashboard: {
    handler: async () => {
      return {
        some: 'output',
      };
    },
    component: AdminBro.bundle('./models/adminDashboard.jsx'),
  },
  branding: {
    companyName: 'Climate Change',
    logo: 'https://i.imgur.com/bO39GLB.png',
    favicon: favIcon,
    softwareBrothers: false,
  },
  locale,
};

const ADMIN = {
  email: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || '12345678',
  authenticate: async (email, password) => {
    if (email == ADMIN.email && password == ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = router;
