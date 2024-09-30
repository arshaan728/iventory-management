import { LargeNumberLike } from "crypto";
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import Header from "../Header";
import { v4 } from 'uuid';


type ProductFormData = {
    name:string;
    price : number;
    stockQuantity : number;
    rating : number;
}
type CreateProductModalProps = {
    isOpen : boolean;
    onClose: () =>void;
    onCreate : (FormData: ProductFormData) =>void;
}

const CreateProductModal = ({isOpen , onClose , onCreate}: CreateProductModalProps ) =>{
    const [FormData , setFormData] = useState({
        productId: v4(),
        name: "",
        price : 0,
        stockQuantity : 0,
        rating :0,
        
    });

    const handleChange =  (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData({
            ...FormData,
            [name]:
            name === "price" || name === "stockQuantity" || name === "rating"
            ? parseFloat(value)
            : value ,
        });

    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        onCreate(FormData);
        onClose();
    }

    if (!isOpen) return null;
    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="productName" className={labelCssStyles}>Product Name</label>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} value={FormData.name} className={inputCssStyles} required/>
                    <label htmlFor="productPrice" className={labelCssStyles}> Price</label>
                    <input type="number" name="name" placeholder="Price" onChange={handleChange} value={FormData.price} className={inputCssStyles} required/>
                    <label htmlFor="stockquantity" className={labelCssStyles}> stockQuantity</label>
                    <input type="number" name="stockQuantity" placeholder="stockquantity" onChange={handleChange} value={FormData.stockQuantity} className={inputCssStyles} required/>
                    <label htmlFor="rating" className={labelCssStyles}> Rating</label>
                    <input type="number" name="rating" placeholder="rating" onChange={handleChange} value={FormData.rating} className={inputCssStyles} required/>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">create</button>
                    <button onClick={onClose} type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                        
                    </button>
                                   </form>
            </div>

        </div>
    )
}
export default CreateProductModal;

