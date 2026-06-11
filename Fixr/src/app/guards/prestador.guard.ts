import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class PrestadorGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        const usuario = this.authService.getUsuario();

        if (!usuario) {
            this.router.navigate(['/cadastro']);
            return false;
        }

        if (usuario.tipo !== 'PRESTADOR') {
            this.router.navigate(['/chatVazio']);
            return false;
        }

        return true;
    }
}