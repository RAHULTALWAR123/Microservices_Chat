import type { Request, Response, NextFunction } from "express";
interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
}
export interface AuthRequest extends Request {
    user?: IUser | null;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=isAuth.d.ts.map