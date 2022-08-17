import express from "express";
import {itemsModel} from "../../Database/allmodels.js"

const Router = express.Router();

Router.get("/", async (req, res) => {
    try {
        const items = await itemsModel.find();
        
        if (items.length === 0)
            return res.status(400).json({ error: "No items found" })

        return res.status(200).json({ items })

    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }

})
Router.get("/:gender", async (req, res) => {
    try {
        const { gender } = req.params;

        const items = await itemsModel.find({ gender });
        
        if (items.length === 0)
            return res.status(400).json({ error: "No items found" })

        return res.status(200).json({ items })

    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

Router.post("/newItem",async(req,res)=>
{
    const addNewItem = await itemsModel.create(req.body);
    return res.json({
        items: addNewItem,
        message: "item was added!!!",
    });
})

export default Router