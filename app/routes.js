// */app/routes.js*
// ## Node API Routes
// Load our API routes for user authentication
import authRoutes from './routes/_authentication.router.js';
import profileRoutes from './routes/_profile.router.js';
import jobOfferRoutes from './routes/_jobOffer.router.js';
import jobApplicationRoutes from './routes/_jobApplication.router.js';
import skillsRoutes from './routes/_skills.router.js';
import aboutRoutes from './routes/_about.router.js';
import organizationProfileRoutes from './routes/_organizationProfile.router.js';
import uploadImgRoutes from './routes/_uploadImg.router.js';

// Define routes for the Node backend
export default (app, router, passport) => {

  // ### Express Middlware to use for all requests
  router.use((req, res, next) => {
    console.log('I sense a disturbance in the force...'); // DEBUG
    // Make sure we go to the next routes and don't stop here...
    next();
  });

  // ### Server Routes
  authRoutes(app, router, passport);

  // Handle things like API calls,
  skillsRoutes(app,router,passport);
  aboutRoutes(app,router,passport);
  jobOfferRoutes(app, router, passport);
  jobApplicationRoutes(app, router, passport);
  profileRoutes(app, router, passport);
  organizationProfileRoutes(app,router,passport);
  uploadImgRoutes(app,router,passport);

	// All of our routes will be prefixed with /api
	app.use('/api', router);

  // ### Frontend Routes
  // Route to handle all Angular requests
  app.get('*', (req, res) => {

    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    //res.status(404);
    //res.end();
    res.sendFile('/dist/index.html', { root: __dirname + "/../"});
  });
};
