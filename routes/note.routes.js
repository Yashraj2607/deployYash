const express=require("express")
const {NoteModel}=require("../model/note.model")
const noteRouter= express.Router()
const {auth}=require("../middleware/auth.middleware")

noteRouter.use(auth)
noteRouter.post("/create",async(req,res)=>{
 const payload=req.body
try {
  
      const note = new NoteModel(payload)
      await note.save()
      res.status(200).json({msg:"new note has been added"})
 
} catch (error) {
    res.status(4000).json({err:error})
}

})

noteRouter.get("/getnote",async(req,res)=>{
    try {
        const note =await NoteModel.find({username:req.body.username})
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({err:error})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note = await NoteModel.findOne({_id:noteID})
    const payload=req.body
    try {
        if(req.body.userID===note.userID){
            
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
        res.status(200).json({msg:`The note with ID:${noteID}has been  update`})   
        }else{
            res.status(200).json({msg:"You are not authorized to update other content"})
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
  const {noteID}=req.params
  const note = await NoteModel.findOne({_id:noteID})
  try {
    if(req.body.userID===note.userID){
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).json({msg:`The note ID:${noteID} deleted`})
    }else{
        res.status(200).json({msg:"ypu are not authprized"})
    }
  } catch (error) {
    res.status(400).json({err:error})
  }
})
module.exports={
    noteRouter
}