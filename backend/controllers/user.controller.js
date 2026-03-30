import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"


const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) return 'User Not Found';

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('generateAccessRefreshTokens error:', error);
        throw new Error('Error generating tokens');
    }
}

export const registerUser = async (req, res) => {
    try {
        let { name, email, password, username } = req.body;

        if (!name || !email || !password || [name, email, password].some((field) => typeof field !== 'string' || field.trim() === '')) {
            return res.status(400).json({ message: 'name, email and password are required' });
        }

        username = (username || name).trim();

        const existUser = await User.findOne({
            $or: [{ name }, { email }, { username }]
        });

        if (existUser) {
            return res.status(400).json({ message: 'User with this email, name or username already exists' });
        }

        const user = await User.create({ name, email, password, username });

        const createdUser = await User.findById(user._id).select('-password -refreshToken');

        if (!createdUser) {
            return res.status(500).json({ message: 'Error creating user' });
        }

        return res.status(201).json({
            message: 'User registered successfully',
            user: createdUser
        });
    } catch (error) {
        console.error('registerUser error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password} = req.body;

    if([email, password].some(field => field?.trim() === '')){
        return res.status(400).json({message:"Email and Password required"})
    }

    const user = await User.findOne({email})

    if(!user) return res.status(400).json({message:"Invalid Email and Password"});

    const passwordMatch = user.isPasswordMatch(password)

    if(!passwordMatch){
        return res.status(400).json({message: "Invalid password"});
    }

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    if(!loggedInUser) return res.status(400).json({message:"Unable To login"})

    const options = {
        httpOnly:true,
        secure: true,
        sameSite: "none"
    }

    return res.status(200)
    .cookie('accessToken', accessToken, options )
    .cookie('refreshToken', refreshToken, options )
    .json({message:"Logged In",accessToken,refreshToken});
 
}

export const deleteUser = async (req,res) => {
    const {userId} = req.params;
    const user = await User.findByIdAndDelete(userId);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({message: "User deleted successfully"});
}

export const updateUser = async (req,res) => {
    const {userId} = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'No data to update' });
    }

    const updateUser = req.body;
    const allowedUpdates = ['name', 'email', 'password'];

    const isValidUpdate = Object.keys(updateUser).every((key) => allowedUpdates.includes(key));

    if (!isValidUpdate) return res.status(400).json({ message: 'Invalid data to update' });

    if(updateUser.password){
        updateUser.password = await bcrypt.hash(updateUser.password, 10)
    } 

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateUser,
        {new:true, runValidators:true}
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });


}
