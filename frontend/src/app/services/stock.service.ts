import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

  getStockData(symbol: string, func: string): Observable<any> {
    const API = `${environment.apiURL}/stocks?symbol=${symbol}&function=${func}`;

    return this.http.get(API).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro ao buscar os dados do ativo.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          errorMessage = `Código do erro: ${error.status}\n Mensagem: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}

