import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
    private readonly logger = new Logger(UsersService.name);

    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    ) {}

    async onModuleInit(): Promise<void> {
    const username = this.configService.get<string>('SEED_ADMIN_USERNAME');
    const password = this.configService.get<string>('SEED_ADMIN_PASSWORD');

    if (!username || !password) {
        return;
    }

    const existing = await this.findByUsername(username);
    if (existing) {
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await this.userRepository.save({ username, passwordHash });
    this.logger.log(`Seeded user "${username}"`);
    }

    findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
    }
}