import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";


export const createTask = asyncHandler(async (req, res) => {
    const  {title, description, status} = req.body;

    if([title, description].some(field => field?.trim() === '')){
       throw new Error("NOT_FOUND");
    }

    const task = await Task.create({
        title,
        description,
        status,
        user: req.user._id
    })

    if(!task){
        throw new Error("NOT_FOUND");
    }

    return sendResponse(res, 201, "Task created successfully", task)
})

export const deleteTask = asyncHandler(async (req,res) =>{
    const {taskId} = req.params;

    const task = await Task.findByIdAndDelete(taskId)
    if(!task) throw new Error("NOT_FOUND")

    return sendResponse(res,200, "Task Deleted", task)
})

export const updateTask = asyncHandler(async (req,res)=>{
    const {taskId} = req.params;
 console.log(taskId)
    if(!req.body || Object.keys(req.body).length == 0 ){
        throw new Error("NOT_FOUND")
    }

    const taskUpdate = req.body;
    console.log(taskUpdate)
    const allowUpdates = ["title","description","status"];

    const isValidUpate = Object.keys(taskUpdate).every((key)=>allowUpdates.includes(key))
    
    if(!isValidUpate) throw new Error("VALIDATION_ERROR")

    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        taskUpdate,
        {new:true,runValidators:true}
    )

    if(!updatedTask) throw new Error("NOT_FOUND")
    
    return sendResponse(res,200,"Task Updated",taskUpdate)

})