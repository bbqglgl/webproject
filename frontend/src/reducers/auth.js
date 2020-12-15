
const auth = (state = [{isLogin:false,email:"",_id:-1}], action) => {
    switch (action.type) {
        case 'auth/LOGIN':
            return [
                {
                    isLogin:true,
                    email: action.enail,
                    _id: action._id
                }
            ]
        case 'auth/LOGOUT':
            return [{isLogin:false,email:"",_id:-1}];
        default:
            return state;
    }
}

export default auth
