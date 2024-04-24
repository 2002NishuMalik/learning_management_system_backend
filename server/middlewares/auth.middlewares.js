import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, _res, next) => {
    const { token } = req.cookies;
    if(!token){
        return next(new AppError('Unauthenticated, please login again ', 401));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    if (!userDetails) {
        return next(new AppError("Unauthorized, please login to continue", 401));
      }

    req.user = userDetails;
    next();
}

const authorizedRoles = (...roles) => async (req, _res, next) =>
{
    const currentUserRoles = req.user.role;
    if(roles.includes(currentUserRoles))
    {
        return next(
            new AppError('you do not have permission to access this route', 400)
        )
    }
    next();
}

const authorizedSubscriber = async (req, _res, next) =>
{
   const subscription = req.user.subscription;
   const currentUserRole = req.user.role;

   if(currentUserRole !== 'ADMIN' && subscription.status !== 'active')
   {
    return next(
        new AppError('please subscribe to access this route!', 403)
    )
   }
   next();
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}