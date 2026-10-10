import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
    sub: string;
    username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }

    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
        algorithms: ['HS256'],
        ignoreExpiration: false,
    });
    }

    validate(payload: JwtPayload) {
    if (!payload.sub || !payload.username) {
        throw new UnauthorizedException('Invalid token payload');
    }

    return {
        userId: payload.sub,
        username: payload.username,
    };
    
    }
}