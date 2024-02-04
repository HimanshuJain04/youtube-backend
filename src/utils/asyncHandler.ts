import { Request, Response, NextFunction } from 'express';

const asyncHandler = async (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch(next);
    }
}

export { asyncHandler };