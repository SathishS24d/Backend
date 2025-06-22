import cartModel from "../model/cart.js";


const cart = {


    //to add new cart item
    create: async (req, res) => {
        const { product_id, name, brand, category, qty,price } = req.body;
        
        try {

            //create model
            const data = await cartModel({
                product_id,
                email:req.user.email,
                name,
                brand,
                category,
                price,
                qty
            })

            //save data in database
            await data.save();

            //send successfully message
            return res.status(201).json({
                message: "Add successfully"
            })
        } catch (error) {

            //send internal server error
            console.log(error)
            res.status(500).json({
                message: error.message
            })
        }
    },
    

    //to read cart items
    read: async (req, res) => {
        try {
            //fatch all cart items from database
            const data = await cartModel.find({});

            //return data 
            return res.status(200).json(data);
        } catch (error) {

            //send internal server error message
            console.log(error)
            res.status(500).json({
                message: error.message
            })
        }
    },
   

    //to update cart quantity
    update: async (req, res) => {
        const { id } = req.params;
        const { qty } = req.body;
        try {

            //find and update command to update qty with given id
            const cartItem = await cartModel.findByIdAndUpdate(id, { $set: { qty } }, { new: true });

            //if user not exist
            if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
            return res.status(200).json({message:"cart item updated"});
        } catch (error) {

            //send internal server errror message
            console.log(error)
            res.status(500).json({
                message: error.message
            })
        }
    },


    //to delete cart item with given id
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            

            //find cart item with given id and delete 
            const cartItem = await cartModel.findByIdAndDelete(id);

            //if user not found with given id
            if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

            //send successfully message
            res.json({ message: "Cart item removed" });

        } catch (error) {

            //send internal server error message
            console.log(error)
            res.status(500).json({
                message: error.message
            })
        }

    }
}

export default cart;