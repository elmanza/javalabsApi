import { Column, Model, Table, DataType, ForeignKey, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Role } from "./role.model";

@Table({
    tableName: 'user',
    paranoid: true
})
export class User extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: string;

    @Column({
        type: DataType.STRING
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare lastname: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare birthday: Date;

    @ForeignKey(() => Role)
    @Column
    declare role_id: number;

    @Column({
        type: DataType.STRING(100),
        unique: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING(100),
        unique: true
    })
    declare username: string;

    @Column({
        type: DataType.STRING
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare gender: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare phone: string;

    @Column({ 
        defaultValue: true,
        type: DataType.BOOLEAN
    })
    declare terms_accepted: boolean;

    @Column({ 
        defaultValue: true, 
        type: DataType.BOOLEAN 
    })
    declare isActive: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare email_verified_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare email_verification_sended_at: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare token: string;

}
