import { Controller, Get, Query, Param, BadRequestException, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { read } from 'fs';

@Controller('funcionarios')
export class FuncionariosController {
    constructor (private readonly funcionariosService:FuncionariosService) {}

    @Get()
    listar(@Query('cargo') cargo?:string) {
        if(cargo) {
            return this.funcionariosService.listarPorCargo(cargo)
        }

        return this.funcionariosService.listarTodos()
    }

    @Get(':registro')
    buscarPorRegistro(@Param('registro') registro:string) {
        const numRegistro = Number(registro)

        if(Number.isNaN(numRegistro)) {
            throw new BadRequestException('Registro de funcionário deve ser um número')
        }

        return this.funcionariosService.buscarPorRegistro(numRegistro)
    }

    @Post()
    criar (
        @Body()
        body: {
            nome: string;
            cargo: string,
            ativo: boolean;
        },
        
    ) {
        return this.funcionariosService.criar(body)
    }

    @Put(':registro')
    atualizarCompleto(
        @Param('registro') registro: string,
        @Body()
        body: {
            nome: string;
            cargo: string;
            ativo: boolean;
        },
    ) {
        const numRegistro = Number(registro)
        if(Number.isNaN(numRegistro)) {
            throw new BadRequestException('O registro deve ser um número')
        }

        return this.funcionariosService.atualizarCompleto(numRegistro, body)
    }

    @Patch(':registro')
    atualizarParcial(
        @Param('registro') registro: string,
        @Body()
        body: {
            nome: string;
            cargo: string;  //<Partial>
            ativo: boolean;
        },
    ) {
        const numRegistro = Number(registro)
        if(Number.isNaN(numRegistro)) {
            throw new BadRequestException('O registro deve ser um número')
        }
        return this.funcionariosService.atualizarParcial(numRegistro, body)
    }

    @Delete(':registro')
    remover(@Param('registro')registro: string) {
        const numRegistro = Number(registro)

        if(Number.isNaN(numRegistro)) {
            throw new BadRequestException('Registro deve ser um número')
        }

        return this.funcionariosService.remover(numRegistro)
    }
}
