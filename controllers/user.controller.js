import { User } from "../models/user.model.js";



// register a user

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important" })
        }



        // check if user already exist
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User already exists" })
        }

        // create user
        const user = await User.create({
            // old way
            // username: username,
            // email : email.toLowerCase(),
            // password : password

            // new way
            username,
            email: email.toLowerCase(),
            password
        });

        res.status(201).json({
            message:
                "User registered",
            user: { id: user._id, email: user.email, username: user.username }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }

}

// login a user

const loginUser = async (req, res) => {
    try {

        // checking if the user already exists
        const { email, password } = req.body

        const user = await User.findOne({
            email: email.toLowerCase()
        })

        if (!user) return res.status(400).json({
            message: "User not found"
        })

        // compare password
        const isMatch = await user.comparePassword(password)
        if (!isMatch)
            return res.status(400).json({
                message: "invalid credentials"
            })

        res.status(200).json({
            message: "User logged in",
            user: {
                id: user_id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })

    }
}

// log out a user
const logOutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'Logout successful' });


    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}


export { registerUser, loginUser, logOutUser };