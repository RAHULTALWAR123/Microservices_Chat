import type { Response } from "express";
import type { AuthRequest } from "../middleware/isAuth.js";
export declare const createNewChat: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllChats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chat.d.ts.map