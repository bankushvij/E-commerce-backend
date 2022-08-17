import express from "express"

import multer from "multer";
import {photosModel} from "../../Database/allmodels.js"
import {s3upload} from "../../utils/s3.config.js";

const Router=express.Router();

const storage=multer.memoryStorage()
const upload=multer({storage})

Router.post("/",upload.single("file"),async(req,res)=>
{
    try{
        const file=req.file;
         
        const bucketOptions={
            Bucket:"myshopmain",
            Key:file.originalname,
            Body:file.buffer,
            ContentType:file.mimetype,
            ACL:"public-read"

        }

        const uploadImage=await s3upload(bucketOptions);

        const saveImageToDatabase=await photosModel.create(
            {
                images:[{location:uploadImage.Location}]
            }
        )

        return res.status(200).json(saveImageToDatabase);
    }
    catch(error)
    {
        return res.status(500).json({error:error.message})
    }
})

Router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id);
      const image = await photosModel.findById(_id);
  
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default Router