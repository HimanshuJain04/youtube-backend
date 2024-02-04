import { Request, Response, NextFunction } from 'express';

const asyncHandler = async (requestHandler: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(() => {
            requestHandler(req, res, next);
        }).catch((err) => {
            next(err);
        })
    }
}

export { asyncHandler };