import { Router } from "express";
import JWTverify from "../middleware/JWTverify.js";
import cart from "../controller/cart.controller.js"

const router = Router();

router.use(JWTverify);


//send all cart items
router.get('/',cart.read)

//create a new cart item
router.post('/',cart.create)


//update cart item with given id
router.put('/:id',cart.update)


//delete cart item with given id
router.delete('/:id', cart.delete)




export default router;