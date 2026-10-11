import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService

    ) {}

    async login(dto: LoginDto){
        const user = await this.usersService.findByUsername(dto.username);

        if (!user) {
            throw new UnauthorizedException('ข้อมูลไม่ถูกต้อง');
        }

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.password_hash
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException('ข้อมูลไม่ถูกต้อง');
        }

        const payload = {sub: user.id, username: user.username};
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            tokenType: 'bearer',
            expiresIn: '1h'
        };

    }
}
