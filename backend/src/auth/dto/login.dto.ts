import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {

    @IsString()
    @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
    @MinLength(3, { message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร' })
    @MaxLength(50, { message: 'ชื่อผู้ใช้ต้องไม่เกิน 50 ตัวอักษร' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
    @MinLength(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
    @MaxLength(100, { message: 'รหัสผ่านต้องไม่เกิน 100 ตัวอักษร' })
    password: string;

}

