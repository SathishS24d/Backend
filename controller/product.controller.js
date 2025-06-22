import productModel from "../model/product.js";


const product = {

    //add new product
    create: async (req, res) => {
        const { brand, category, name, description, offer, price } = req.body;
        try {

            //create model of data
            const data = await productModel({
                brand,
                category,
                name,
                description,
                offer,
                price
            })
        //    save in database
           await data.save();
           

        //    send successfully message
            return res.status(201).json({
                message: "New Product added successfully"
            })

        } catch (error) {
            // send internal server error message 
            res.status(500).json({
                message: error.message
            })
        }

    },
  

    //read all product items
    read: async (req, res) => {
        try {

            //fatch all data
            const data = await productModel.find({});
            return res.json(data);
        } catch (error) {

            //send internal server error message
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }

    },

    //read  data with given id
    readOne: async (req, res) => {
        const { id } = req.params;
        try {

            //database command to fatch data with given id
            const data = await productModel.findOne({_id:id});
            if(!data) return res.status(404).json({message:"User not found"});

            //send successfully message
            return res.status(200).json(data);

        } catch (error) {
            //send internal server error message
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },


    //update product with given id
    update: async (req, res) => {
        const { id } = req.params;
        const { brand, category, name, description, offer, price } = req.body;
        try {

            //find and update product item with given id
            const product = await productModel.findByIdAndUpdate(
                id,
                { $set: { brand, category, name, description, offer, price } },
                { new: true }
            );

            //if user not exist
            if (!product) return res.status(404).json({ message: "product not found" })
            return res.status(200).json({ message: "product updated" });



        } catch (error) {
            //send internal server error message
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
  

    // delete product with given id 
    delete: async (req, res) => {
        const { id } = req.params;
        console.log(id)
        try {
            //command to find and delete product
            const data = await productModel.findByIdAndDelete(id);
            console.log(data)
            if (!data) return res.status(404).json({ message: "Product not found" })
            return res.status(200).json({ message: "product deleted" })

        } catch (error) {
            //send internal server error message`
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

export default product;