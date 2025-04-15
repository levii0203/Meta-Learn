import React, {useState} from "react";
import { Input , Form } from "@heroui/react";

interface props {
    setEducatorId: React.Dispatch<React.SetStateAction<number|undefined>>;
    setPrice: React.Dispatch<React.SetStateAction<number|undefined>>;
    setTitle: React.Dispatch<React.SetStateAction<string|undefined>>;
    setDescription: React.Dispatch<React.SetStateAction<string|undefined>>;
}


const AddSetting:React.FC<props> = ({setEducatorId, setPrice, setTitle, setDescription})=>{
    
    return (
        <div className="h-full w-full bg-zinc-800 gap-4  flex flex-col py-8 px-8">
           <Form validationBehavior="aria" className="w-full gap-6 h-full flex flex-col">
            <Input
                isRequired
                label="Educator id"
                labelPlacement="outside-left"
                placeholder="Enter educator id"
                className="placeholder:ml-2"
                onChange={(e)=>setEducatorId(parseInt(e.target.value))}
            />
             <Input
                isRequired
                label="Price"
                labelPlacement="outside-left"
                placeholder="Enter price"
                className="placeholder:ml-2"
                onChange={(e)=>setPrice(parseInt(e.target.value))}
                
            />
            <Input
                isRequired
                label="Title"
                labelPlacement="outside-left"
                placeholder="Enter title"
                className="placeholder:ml-2"
                onChange={(e)=>setTitle(e.target.value)}
            />
            <Input
                isRequired
                label="Description"
                labelPlacement="outside-left"
                placeholder="Enter description"
                className="placeholder:ml-2"
                onChange={(e)=>setDescription(e.target.value)}
            />
            </Form>
        </div>
    )
}
export default AddSetting;