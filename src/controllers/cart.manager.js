import CartRepository from "../repository/cart.repository.js";

const cartRepository = new CartRepository();

export const createCart = async(req, res)=>{
    try {
        const cart={ products:[] };
        const newCart= cartRepository.create(cart);
        res.json(newCart);
        
    } catch (error) {
        throw error;
    };
};

export const getCart = async(req, res)=>{
    try {
        const {cid} = req.params;
        if (cid) {
            const cart= await cartRepository.getById(cid);
            return res.json(cart);
        } else {
            const cart= await cartRepository.get();
            return res.json(cart);
        };
        
    } catch (error) {
        throw error;
    };
};

export const deleteCart = async(req, res)=>{
    try {
        const {cid} = req.params;
        const cart = await cartRepository.delete(cid);
        res.json({message:"carrito eliminado", id: cart._id});
        
    } catch (error) {
        throw error;
    };
};