import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class ClienteGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        const usuario = this.authService.getUsuario();
        console.log('usuario no guard:', usuario); // ← adicione
    console.log('tipo:', usuario?.tipo); 

        if (!usuario) {
            this.router.navigate(['/cadastro']);
            return false;
        }

        if (usuario.tipo !== 'CLIENTE') {
            this.router.navigate(['/chatVazioPrestador']);
            return false;
        }

        return true;
    }
}