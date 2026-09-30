// server/src/accounts/controllers/AuthController.ts

import e, {NextFunction, Request, Response} from "express";
import {AccountService} from "../services/AccountService";
import {LoginRequestDto, LoginRequestSchema, RegisterRequestSchema} from "shared";
import {AccountAssembler} from "../assemblers/AccountAssembler";
import {EmailService} from "@email/EmailService";
import {AccountCredentialsCommand, AccountLoginResultDomain} from "../domain/AccountDomain";
import {IncomingHttpHeaders} from "node:http2";

const emailService = new EmailService();

export class AuthController {
  constructor(private readonly auth: AccountService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = RegisterRequestSchema.parse(req.body);
      const account = await this.auth.register(AccountAssembler.toCredentials(dto));
      res.status(201).json(AccountAssembler.toAccountDto(account));
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: LoginRequestDto = LoginRequestSchema.parse(req.body);
      const credentials: AccountCredentialsCommand = AccountAssembler.toCredentials(dto);
      const deviceFingerprint: any = await this.detectNewDevice(req, credentials);
      const result: AccountLoginResultDomain = await this.auth.login(credentials);

      if (deviceFingerprint) {
        await emailService.sendNewDeviceLoginEmail(result.account.email, deviceFingerprint);
      }
      const suspiciousDetails: any = await this.detectSuspiciousLogin(result.account.email, null);
      if (suspiciousDetails) {
        await emailService.sendSuspiciousLoginEmail(result.account.email, suspiciousDetails);
      }

      res.status(200).json(AccountAssembler.toLoginResponse(result));
    } catch (err) {
      next(err);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string | undefined = req.auth?.accountId;
      if (!accountId) return res.status(401).json({ error: "UNAUTHENTICATED" });

      const account = await this.auth.getAccount(accountId);
      if (!account) return res.status(404).json({ error: "NOT_FOUND" });

      res.status(200).json(AccountAssembler.toAccountDto(account));
    } catch (err) {
      next(err);
    }
  };

  detectNewDevice = async (req: Request, credentials: AccountCredentialsCommand) => {
    const headers: IncomingHttpHeaders = req.headers;
    // get userAgent, host, location, etc.
    // create a device 'fingerprint' from the current device
    // Call the service -> repository to get a list of account devices and compare to the current device.
    // If new device, add it to the account devices.

    // const knownDevices = await db.userDevices.findMany({ where: { email } });
    // if (!knownDevices.some(d => d.fingerprint === fingerprint)) {
    //   await db.userDevices.create({ data: { email, fingerprint } });
    //   return true;
    // }
    return false;
  }

  detectSuspiciousLogin = async (email: string, ip: any) => {
    // Implement your logic to detect suspicious logins based on email and IP address
    // For example, you could check if the IP address is from a different country than usual
    // or if there are multiple failed login attempts from the same IP address. (requires logging failures)
    // Return details about the suspicious activity if detected, otherwise return null.

    // const reputation = await checkIpReputation(ip);
    // if (reputation.isMalicious) {
    //   return `Malicious IP detected: ${ip} (${reputation.reason})`;
    // }
    // const attempts = await rateLimiter.getAttempts(email)
    // if (attempts > 10) {
    //   return `Excessive login attempts detected from IP ${ip}`;
    // }
    return null; // Placeholder implementation
  }

}
