
function SignUpResponsePayload (user_id, username, user_email, user_avatar_url, accessToken) {

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
        }
)}

module.exports = {
    SignUpResponsePayload
}