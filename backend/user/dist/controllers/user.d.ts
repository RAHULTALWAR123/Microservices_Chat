import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/isAuth.js";
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const verifyUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const profile: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateUser: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const getAUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.d.ts.map