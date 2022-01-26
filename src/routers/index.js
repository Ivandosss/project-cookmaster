const router = require('express').Router();

const { loginController } = require('../controllers/loginController');
const {
  recipesCreateController, 
  recipesSearchController,
  recipesSearchByIdController,
  recipeUpdateController,
  recipesDeleteController,
  imageUpdateController,
} = require('../controllers/recipesController');
const { createUserController } = require('../controllers/usersController');
const multer = require('../middlewares/multer');
const { tokenValidation } = require('../middlewares/tokenValidation');

router.post(
  '/users',
  createUserController,
);

router.post(
  '/login',
  loginController,
);

router.post(
  '/recipes',
  tokenValidation,
  recipesCreateController,
);

router.get(
  '/recipes',
  recipesSearchController,
);

router.get(
  '/recipes/:id',
  recipesSearchByIdController,
);

router.put(
  '/recipes/:id',
  tokenValidation,
  recipeUpdateController,
);

router.delete(
  '/recipes/:id',
  tokenValidation,
  recipesDeleteController,
);

router.put(
  '/recipes/:id/image',
  tokenValidation,
  multer,
  imageUpdateController,
);

module.exports = router;
