import jwt from 'jsonwebtoken'
import { userNameExist } from '../databases/authdb.js'

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if(!authHeader || !authHeader.toLowerCase().startsWith('bearer')) 
        return res.status(401).json({ 'error': 'Unauthorized'})
    
    const token = authHeader.substring(7)

    try {
        const decodedToken = jwt.verify(token, 'my_secret_key')

        if(!userNameExist(decodedToken.username)) {
            return res.status(401).json({ 'error': 'Unauthorized'})            
        }

        req.user = decodedToken.username
        next()

    } catch(err) {
        return res.status(401).json({ 'error': 'Unauthorized'}) 
    }
}