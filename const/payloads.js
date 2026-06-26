const { generateToken } = require("../utils/tokenHandler")


function SignUpResponsePayload (user_id, username, user_email, user_avatar_url) {
    const {accessToken, refreshToken} = generateToken({user_id, username, user_email, user_avatar_url})
    return(
        {
            "success": true,
            "message": "User registered successfully",
            "data": {
              "id": user_id,
              "username": username,
              "email": user_email,
              "avatarUrl": user_avatar_url
            },
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
)}

module.exports = {
    SignUpResponsePayload
}