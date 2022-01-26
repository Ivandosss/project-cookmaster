const router = require('express').Router();

const { loginController } = require('../controllers/loginController');
const {
  recipesCreateController, 
  recipesSearchController,
  recipesSearchByIdController,
  recipeUpdateController,
  recipesDeleteController,
} = require('../controllers/recipesController');
const { createUserController } = require('../controllers/usersController');
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

module.exports = router;
