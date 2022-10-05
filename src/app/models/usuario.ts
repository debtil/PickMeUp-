export class Usuario {
    private  _id!: string;
    private _nome: string;
    private  _email: string;
    private _senha: string;

     constructor(nome: string, email: string, senha: string){
            this._nome = nome;
            this._email = email;
            this._senha = senha;
        }
    public get id(): string {
        return this._id;
    }

    public set id (id: string){
        this._id = id;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(nome: string) {
        this._nome = nome;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get senha(): string {
        return this._senha;
    }

    public set senha(senha: string) {
        this._senha = senha;
    }

    
}